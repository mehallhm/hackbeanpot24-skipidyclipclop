"use server";

import { calc_best_times } from "@/lib/algorithms/algorithm";
import { lobtEmails } from "@/lib/gapi/gCal";

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
  timeRange: "Morning" | "Noon" | "Afternoon" | "Evening" | "Night";
}

export async function calculateTimes({
  emails,
  eventLength,
  startDate,
  endDate,
  timeRange,
}: Props) {
  console.log("action", emails, eventLength, startDate, endDate, timeRange);

  const minDate = new Date(startDate);
  const maxDate = new Date(new Date(endDate).getTime() + 60 * 60 * 1000);

  console.log("minDate: ", minDate);
  console.log("maxDate: ", maxDate);

  const times = await lobtEmails(
    emails,
    minDate.toISOString(),
    maxDate.toISOString(),
  );
  console.log(times);

  const timeHours = timeTranslations[timeRange];

  console.log("timeHours: ", timeHours);

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

  console.log("bestTimes: ", bestTimes);

  // const minDate = new Date(startDate);
  // const maxDate = new Date(new Date(endDate).getTime() + 60 * 60 * 1000);
  //
  // const times = await lobtEmails(
  //   emails,
  //   minDate.toISOString(),
  //   maxDate.toISOString(),
  // );
  //
  // if (times instanceof Error) {
  //   throw times;
  // }
  //
  // const bestTimes = calc_best_times(
  //   times,
  //   eventLength,
  //   startDate,
  //   dayStartHour,
  //   dayStartMinute,
  //   endDate,
  //   dayEndHour,
  //   dayEndMinute,
  // );
}
