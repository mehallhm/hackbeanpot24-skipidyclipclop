"use server";

import { calc_best_times } from "@/lib/algorithms/algorithm";
import { lobtEmails } from "@/lib/gapi/gCal";
import { createEvent, verifyUsers } from "@/lib/mUsers";
import type { ScheduleEvent } from "@/lib/types";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";

const timeTranslations = {
  Morning: { start: 9, end: 12 },
  Noon: { start: 12, end: 15 },
  Afternoon: { start: 15, end: 18 },
  Evening: { start: 18, end: 21 },
  Night: { start: 21, end: 24 },
};

interface Props {
  emails: string[];
  eventLength: number;
  startDate: Date;
  endDate: Date;
  title: string;
  timeRange: "Morning" | "Noon" | "Afternoon" | "Evening" | "Night";
}
export async function calculateTimes({
  emails,
  eventLength,
  startDate,
  endDate,
  timeRange,
  title,
}: Props) {
  const user = await getServerSession(authOptions);
  const includedEmails = [user?.user?.email || "🫥", ...emails];

  const minDate = new Date(startDate);
  const maxDate = new Date(new Date(endDate).getTime() + 60 * 60 * 1000);
  const timeHours = timeTranslations[timeRange];

  const nonVerified = await verifyUsers(includedEmails);

  await createEvent({
    createdAt: new Date(),
    emails: includedEmails,
    invalidEmails: nonVerified,
    pending: nonVerified.length > 0,
    eventLength,
    startDateRange: startDate,
    endDateRange: endDate,
    timeRange,
    title,
  });

  if (nonVerified.length > 0) {
    return {
      error: {
        message: "Unverified emails",
        code: 100,
        emails: nonVerified,
      },
    };
  }

  const times = await lobtEmails(
    includedEmails,
    minDate.toISOString(),
    maxDate.toISOString(),
  );

  if (times instanceof Error) {
    return {
      error: {
        message: "Failed to fetch busy times",
        code: 101,
        error: times,
      },
    };
  }

  const bestTimes = calc_best_times(
    times,
    eventLength,
    startDate,
    endDate,
    timeHours.start,
    timeHours.end,
    0,
    0,
  );

  console.log("Best times:", bestTimes);
  return bestTimes;
}
