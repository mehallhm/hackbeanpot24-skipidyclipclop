"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentEvents } from "@/app/actions";
import { RecentCard } from "../components/RecentCard";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { calculateTimes } from "./new/actions";

export default function RecentEvents() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentEvents"],
    queryFn: async () => await getRecentEvents(),
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((event, i) => (
            <RecentCard
              eventName={event.title}
              time={event.timeRange}
              people={event.emails}
              startDay={event.startDateRange}
              endDay={event.endDateRange}
              length={event.eventLength}
              key={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}
