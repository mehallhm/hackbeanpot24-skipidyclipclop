import React from "react";
import sunrise from "../../../public/Sunrise Icon.png";
import sunset from "../../../public/Sunset Icon with Arrow.jpg";
import moon from "../../../public/Moon Regular.svg";
import sun from "../../../public/Sun Regular.svg";
import Image from "next/image";

export enum Time {
  Afternoon = "Afternoon",
  Morning = "Morning",
  Night = "Night",
  Evening = "Evening",
}

type ImageDictionary = {
  [key in Time]: string;
};

export function Card({
  eventName,
  time,
  people,
}: {
  eventName: string;
  time: Time;
  people: string[];
}) {
  const combinedString: string = people.join(", ");
  const imgDict: ImageDictionary = {
    [Time.Afternoon]: "/Sun Regular.svg",
    [Time.Night]: "/Moon Regular.svg",
    [Time.Morning]: "/Sunrise Icon.png",
    [Time.Evening]: "/Sunset Icon with Arrow.jpg",
  };

  return (
    <div className="m-10 rounded-lg border-4 border-black p-5 ">
      <div className="flex justify-between">
        <div className="text-left">
          <h1>{eventName}</h1>
          <div className="flex-initial text-left truncate w-60">
            {combinedString}
          </div>
        </div>

        <div className="text-right">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <Image src={imgDict[time]} alt="asdfdsa" width={40} height={40} />
              {time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
