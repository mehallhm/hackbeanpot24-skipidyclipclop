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
 
 return (
   <div
     className="ml-8 mt-2 mr-8 rounded-lg border-2 border-grey p-5 "
   >
     <div className="flex">
       <div className="text-left mb-2 flex w-1/2 flex-col align-middle justify-center">
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
           {combinedString}
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
 )};