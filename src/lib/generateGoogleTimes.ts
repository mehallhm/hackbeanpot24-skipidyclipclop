import clientPromise from "./mongodb";
import type { gCalResponse } from "@/lib/types";

async function getBusyTimes(
  auth: string,
  timeMin: string,
  timeMax: string,
  calendarIds: string[],
): Promise<{ start: string; end: string }[] | Error> {
  const apiKey = process.env.GOOGLE_API_KEY!;

  try {
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

    if (data.groups.errors) {
      return new Error(
        data.groups.errors.reduce((msg, e) => msg + " && " + e.reason, ""),
      );
    }

    return data.calendars.busy;
  } catch (e) {
    console.error(e);
    return new Error("Failed to fetch busy times: " + e);
  }
}
