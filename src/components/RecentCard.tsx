import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export enum Time {
  Afternoon = "Afternoon",
  Morning = "Morning",
  Night = "Night",
  Evening = "Evening",
}

type ImageDictionary = {
  [key in Time]: string;
};

export function RecentCard({
  eventName,
  time,
  people,
  startDay,
  endDay,
  length,
}: {
  eventName: string;
  time: Time;
  people: string[];
  startDay: Date;
  endDay: Date;
  length: number;
}) {
  const combinedString: string = people.join(", ");
  const imgDict: ImageDictionary = {
    [Time.Afternoon]: "/Sun Regular.svg",
    [Time.Night]: "/Moon Regular.svg",
    [Time.Morning]: "/Sunrise Icon.png",
    [Time.Evening]: "/Sunset Icon with Arrow.jpg",
  };

  type TimeOptions = "Morning" | "Noon" | "Afternoon" | "Evening" | "Night";

  const options =
    "?" +
    new URLSearchParams({
      title: eventName,
      eventLength: String(length),
      minDate: startDay.toISOString(),
      maxDate: endDay.toISOString(),
      timeRange: time,
      emails: people.join(","),
    }).toString();

  return (
    <div className="rounded-lg border-2 border-secondary p-3 flex flex-col gap-2">
      <div className="flex justify-between gap-4 items-center">
        <div className="text-left flex flex-col align-middle justify-center text-ellipsis truncate">
          <h1 className="flex-initial text-xl font-semibold">{eventName}</h1>
          <div className="flex-initial text-left text-sm text-ellipsis overflow-hidden">
            {combinedString}
          </div>
        </div>
        <div className="flex flex-col items-center text-sm">
          <Image src={imgDict[time]} alt="timeOfDay" width={30} height={30} />
          {time}
        </div>
      </div>
      <div className="flex w-full justify-between">
        <Button variant="outline">
          <Link href={`/new${options}`}>Repeat Event</Link>
        </Button>

        <Button>
          <Link href={`/results${options}`}>View Results</Link>
        </Button>
      </div>
    </div>
  );
}
