import type { gCalResponse } from "@/lib/types";
import { getUsers } from "@/lib/mUsers";
import refreshToken from "@/lib/gapi/refreshToken";

export async function getBusyTimes(
  auth: string,
  timeMin: string,
  timeMax: string,
  calendarIds: string[],
): Promise<{ start: string; end: string }[]> {
  const apiKey = process.env.GOOGLE_API_KEY!;

  const resp = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy?key=" + apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth}`,
      },
      body: JSON.stringify({
        timeMin,
        timeMax,
        items: calendarIds.map((id) => ({ id })),
      }),
    },
  );

  const data = (await resp.json()) as gCalResponse;

  if (data.groups?.errors) {
    throw new Error(
      data.groups.errors.reduce((msg, e) => msg + " && " + e.reason, ""),
    );
  }

  // TODO: use all calendars
  return data.calendars.primary.busy;
}

export async function lobtEmails(
  emails: string[],
  timeMin: string,
  timeMax: string,
) {
  const users = await getUsers(emails);
  if (users.length == 0) throw Error("No users");
  const userAuthPromises = users.map(async (u) => {
    return await refreshToken(u._id.toString());
  });
  const userAuthSettled = await Promise.allSettled(userAuthPromises);
  if (userAuthSettled.some((p) => p.status === "rejected")) {
    console.error(userAuthSettled);
    return new Error("Failed to refresh tokens for some users");
  }
  // @ts-ignore
  const userAuths = userAuthSettled.map((p) => p.value as string);

  const userData = userAuths.map((a) => ({
    auth: a,
    calendarIds: ["primary"],
  }));

  const busyTimePromises = userData.map(async (user) =>
    getBusyTimes(user.auth, timeMin, timeMax, user.calendarIds),
  );
  const busyTimes = await Promise.allSettled(busyTimePromises);
  if (busyTimes.some((p) => p.status === "rejected")) {
    console.error(busyTimes);
    return new Error("Failed to fetch busy times for some users");
  }

  return busyTimes.map((p) =>
    // @ts-ignore
    p.value.map((t: { start: string; end: string }) => ({
      start: new Date(t.start),
      end: new Date(t.end),
    })),
  );
}
