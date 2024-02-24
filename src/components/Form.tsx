"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import React from "react";

export function NewEventForm() {
  const timeOptions = ["Morning", "Noon", "Afternoon", "Evening", "Night"];
  const [title, setTitle] = useState("");
  const [eventLength, setEventLength] = useState("");
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [timeRange, setTimeRange] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit() {
    if (
      !title ||
      !eventLength ||
      !startDate ||
      !endDate ||
      !timeRange ||
      emails.length === 0
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (startDate > endDate) {
      setError("Start date cannot be after end date");
      return;
    }

    // Perform submit logic here
    console.log("Form submitted");
    console.log("Title:", title);
    console.log("Event Length:", eventLength);
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    console.log("Time Range:", timeRange);
    console.log("Emails:", emails);

    setTitle("");
    setEventLength("");
    setStartDate(undefined);
    setEndDate(undefined);
    setTimeRange("");
    setEmails([]);
    setInput("");
    setError(null);
  }

  function addEmail() {
    if (!input) return;
    if (emails.includes(input)) {
      setError("Email already added");
      return;
    }
    setEmails([...emails, input]);
    setInput("");
    setError(null);
  }

  return (
    <div className="space-y-8">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Link Up
      </h1>
      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Title
        </h3>
        <Input
          type="text"
          id="title"
          placeholder="Enter the title of your event"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Event Length
        </h3>
        <Input
          type="int"
          id="eventLength"
          placeholder="Enter the expected length of event"
          value={eventLength}
          onChange={(e) => setEventLength(e.target.value)}
        />
      </div>

      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Start Date
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !startDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          End Date
        </h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Time Range
        </h3>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pick a Time Range" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          Invitees
        </h3>
        <div>
          <div className="flex gap-2">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              onClick={(e: any) => addEmail()}
              variant="outline"
              size="icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {emails.map((email) => (
            <div
              key={email}
              className="flex items-center w-full gap-2 justify-between"
            >
              <span>{email}</span>
              <Button
                variant="outline"
                size="icon"
                className="w-8"
                onClick={() => setEmails(emails.filter((e) => e !== email))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onSubmit}>Submit</Button>
    </div>
  );
}

export default NewEventForm;
