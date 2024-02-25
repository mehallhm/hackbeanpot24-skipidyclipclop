"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentEvents } from "@/app/actions";
import { eventNames } from "process";
import React from "react";
import { PendingCard } from "../components/PendingCard";

export default function PendingEvents() {
  const { data, isLoading } = useQuery({
    queryKey: ["pendingEvents"],
    queryFn: async () => await getRecentEvents(),
  });

  console.log(data);
  const pendingEvents = data?.filter((event) => event.pending);
  console.log(pendingEvents);
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {pendingEvents?.map((event, i) => (
            <PendingCard
              eventName={event.title}
              time={event.timeRange}
              peopleTotal={event.emails}
              peopleInvalid={event.invalidEmails}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
//{if (event.pending):
