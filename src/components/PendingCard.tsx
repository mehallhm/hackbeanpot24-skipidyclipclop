import React from "react";
import sunrise from "../../../public/Sunrise Icon.png";
import sunset from "../../../public/Sunset Icon with Arrow.jpg";
import moon from "../../../public/Moon Regular.svg";
import sun from "../../../public/Sun Regular.svg";
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
    <div className="ml-8 mt-2 mr-8 rounded-lg border-2 border-grey p-5 ">
      <div className="flex">
        <div>
          <div className="text-left w-auto mb-2 flex flex-col">
            <h1
              className="flex flex-row text-2xl pr-2 font-extrabold truncate"
              style={{ width: "30vw" }}
            >
              {eventName}
              <div className="ml-3">
                <StatusBubble
                  current={peopleTotal.length - peopleInvalid.length}
                  total={peopleTotal.length}
                />
              </div>
            </h1>

            <div
              className="flex-initial text-left font-normal truncate"
              style={{ width: "30vw" }}
            >
              {"Accepted: " + currentString}
            </div>
            <div
              className="flex-initial text-left font-normal text-red-500 truncate"
              style={{ width: "30vw" }}
            >
              {"Pending: " + pendingString}
            </div>
          </div>
        </div>

        <div className="flex justify-end w-1/2">
          <div className="flex flex-col items-center">
            <Image src={imgDict[time]} alt="timeOfDay" width={40} height={40} />
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
