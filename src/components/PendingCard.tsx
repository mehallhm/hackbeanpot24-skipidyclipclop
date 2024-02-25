import React from "react";
import Image from "next/image";
import StatusBubble from "./Bubble";

export enum Time {
  Noon = "Noon",
  Afternoon = "Afternoon",
  Morning = "Morning",
  Night = "Night",
  Evening = "Evening",
}

type ImageDictionary = {
  [key in Time]: string;
};

export function PendingCard({
  eventName,
  time,
  peopleTotal,
  peopleInvalid,
}: {
  eventName: string;
  time: Time;
  peopleTotal: string[];
  peopleInvalid: string[];
}) {
  const totalString: string = peopleTotal.join(", ");
  const pendingString: string = peopleInvalid.join(", ");

  const pendingArray: string[] = pendingString.split(", ");
  const currentArray: string[] = totalString
    .split(", ")
    .filter((person) => !pendingArray.includes(person));

  const currentString: string = currentArray.join(", ");

  const imgDict: ImageDictionary = {
    [Time.Noon]: "/Sun Regular.svg",
    [Time.Afternoon]: "/Sun Regular.svg",
    [Time.Night]: "/Moon Regular.svg",
    [Time.Morning]: "/Sunrise Icon.png",
    [Time.Evening]: "/Sunset Icon with Arrow.jpg",
  };

  type TimeOptions = "Morning" | "Noon" | "Afternoon" | "Evening" | "Night";

  return (
    <div className="rounded-lg border-2 border-secondary p-3">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex flex-col truncate">
          <h1 className="flex flex-row text-xl font-semibold">
            {eventName}
            <div className="ml-3">
              <StatusBubble
                current={peopleTotal.length - peopleInvalid.length}
                total={peopleTotal.length}
              />
            </div>
          </h1>

          <div className="text-left text-sm overflow-hidden text-ellipsis">
            {"Accepted: " + currentString}
          </div>
          <div className="text-left text-sm text-destructive overflow-hidden text-ellipsis">
            {"Pending: " + pendingString}
          </div>
        </div>

        <div className="flex flex-col items-center text-sm">
          <Image src={imgDict[time]} alt="timeOfDay" width={30} height={30} />
          {time}
        </div>
      </div>
    </div>
  );
}
