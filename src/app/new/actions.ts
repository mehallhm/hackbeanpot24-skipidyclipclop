"use server";

import { calc_best_times } from "@/lib/gapi/algorithm";
import { lobtEmails } from "@/lib/gapi/gCal";
import { createEvent, verifyUsers } from "@/lib/mUsers";
import type { ScheduleEvent } from "@/lib/types";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { redirect } from "next/navigation";

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

  const minDate = new Date(startDate);
  const maxDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);
  const timeHours = timeTranslations[timeRange];

  const nonVerified = await verifyUsers(emails);

  await createEvent({
    createdAt: new Date(),
    emails,
    invalidEmails: nonVerified,
    pending: nonVerified.length > 0,
    eventLength,
    startDateRange: startDate,
    endDateRange: endDate,
    timeRange,
    title,
  });

  if (nonVerified.length > 0) {
    return nonVerified;
  }

  return (
    "/results?" +
    new URLSearchParams({
      title,
      eventLength: String(eventLength),
      minDate: minDate.toISOString(),
      maxDate: maxDate.toISOString(),
      timeRange,
      emails: emails.join(","),
    }).toString()
  );
}
