import React from "react";
import sunrise from "../../../public/Sunrise Icon.png";
import sunset from "../../../public/Sunset Icon with Arrow.jpg";
import moon from "../../../public/Moon Regular.svg";
import sun from "../../../public/Sun Regular.svg";
import Image from "next/image";
import StatusBubble from "./Bubble";

export enum Time {
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
  peopleCurrent,
  peopleTotal,
}: {
  eventName: string;
  time: Time;
  peopleCurrent: string[];
  peopleTotal: string[];
}) {
  const combinedString: string = peopleCurrent.join(", ");
  const imgDict: ImageDictionary = {
    [Time.Afternoon]: "/Sun Regular.svg",
    [Time.Night]: "/Moon Regular.svg",
    [Time.Morning]: "/Sunrise Icon.png",
    [Time.Evening]: "/Sunset Icon with Arrow.jpg",
  };

  return (
    <div className="ml-8 mt-2 mr-8 rounded-lg border-2 border-grey p-5 ">
      <div className=" w-full flex flex-row justify-between ">
        <div className="w-15 pl-2">
          <StatusBubble
            current={peopleCurrent.length}
            total={peopleTotal.length}
          />
        </div>
        <div className="flex justify-between">
          <div className="text-left mb-2 flex flex-col align-middle justify-center">
            <h1
              className="flex-initial text-2xl font-extrabold truncate"
              style={{ width: "30vw" }}
            >
              {eventName}
            </h1>
            <div
              className="flex-initial text-left font-normal truncate"
              style={{ width: "30vw" }}
            >
              {combinedString +
                " and " +
                (peopleTotal.length - peopleCurrent.length) +
                " more"}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex justify-center">
            <div className="flex flex-col items-center pr-2 pt-1">
              <Image src={imgDict[time]} alt="asdfdsa" width={40} height={40} />
              {time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
