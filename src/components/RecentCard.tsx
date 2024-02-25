import React from "react";
import sunrise from "../../../public/Sunrise Icon.png";
import sunset from "../../../public/Sunset Icon with Arrow.jpg";
import moon from "../../../public/Moon Regular.svg";
import sun from "../../../public/Sun Regular.svg";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { calculateTimes } from "../app/new/actions";

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

  const mutation = useMutation({
    mutationFn: () => {
      console.log("go");
      return calculateTimes({
        emails,
        eventLength: Number(eventLength),
        startDate: startDate ?? new Date(),
        endDate: endDate ?? new Date(),
        timeRange,
        title,
      });
    },
    onSuccess: (data) => {
      console.log("Success", data);

      setTitle("");
      setEventLength("");
      setStartDate(undefined);
      setEndDate(undefined);
      setTimeRange("Morning");
      setEmails([]);
      setInput("");
      setError(null);
    },
  });

  const [title, setTitle] = useState(eventName);
  const [eventLength, setEventLength] = useState(length);
  const [startDate, setStartDate] = React.useState<Date>(startDay);
  const [endDate, setEndDate] = React.useState<Date>(endDay);
  const [timeRange, setTimeRange] = useState<TimeOptions>(time);
  const [emails, setEmails] = useState<string[]>(people);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  // setTitle(eventName);
  // setEventLength(eventLength);
  // setStartDate(startDay);
  // setEndDate(endDay);
  // setTimeRange(time);
  // setEmails(people);
  // setInput("");
  // setError(null);

  return (
    <div
      onClick={onSubmit}
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
  );
  function onSubmit() {
    console.log("entered");
    if (
      !title ||
      !eventLength ||
      !startDate ||
      !endDate ||
      !timeRange ||
      emails.length === 0
    ) {
      setError("Please fill in all fields");
      console.log(title);
      console.log(eventLength);
      console.log(startDate);
      console.log(endDate);
      console.log(timeRange);
      console.log(emails.length);

      return;
    }

    if (startDate > endDate) {
      setError("Start date cannot be after end date");
      console.log(error);

      return;
    }

    if (Number.isNaN(Number(eventLength))) {
      setError("Event length must be a number");
      console.log(error);

      return;
    }
    console.log(error);
    console.log("entered2");

    mutation.mutate();

    // Perform submit logic here
    console.log("Form submitted");
    console.log("Title:", title);
    console.log("Event Length:", eventLength);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Time Range:", timeRange);
    console.log("Emails:", emails);
  }
}
