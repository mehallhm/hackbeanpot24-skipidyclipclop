import ResultsDisplay from "@/app/results/ResultsDisplay";
import { verifyUsers } from "@/lib/mUsers";
import { lobtEmails } from "@/lib/gapi/gCal";
import { calc_best_times } from "@/lib/gapi/algorithm";

const timeTranslations = {
  Morning: { start: 9, end: 12 },
  Noon: { start: 12, end: 15 },
  Afternoon: { start: 15, end: 18 },
  Evening: { start: 18, end: 21 },
  Night: { start: 21, end: 24 },
};

export default async function ResultsWrapper({
  params,
}: {
  params: { [key: string]: string | string[] | undefined };
}) {
  const minDate = new Date(params?.minDate as string);
  const maxDate = new Date(params?.maxDate as string);
  const eventLength = Number(params?.eventLength as string);

  const timeRange = params?.timeRange as keyof typeof timeTranslations;
  const timeHours = timeTranslations[timeRange];

  const emailList = params?.emails as string;
  const emails = emailList.split(",");

  const nonVerified = await verifyUsers(emails);

  if (nonVerified.length > 0) {
    return (
      <div>
        <h1>Unverified emails</h1>
        <p>Some emails have not been verified</p>
      </div>
    );
  }

  const times = await lobtEmails(
    emails,
    minDate.toISOString(),
    maxDate.toISOString(),
  );

  if (times instanceof Error) {
    throw times;
  }

  const timezonedStart = timeHours.start - minDate.getTimezoneOffset() / 60;
  const timezonedEnd = timeHours.end - minDate.getTimezoneOffset() / 60;

  console.log(timezonedStart, timezonedEnd);

  const bestTimes = calc_best_times(
    times,
    eventLength,
    minDate,
    maxDate,
    timezonedStart,
    0,
    timezonedEnd,
    0,
  );

  const parsedDates = bestTimes.map((t) => t[0]) as Date[];

  return <ResultsDisplay data={parsedDates} />;
}
