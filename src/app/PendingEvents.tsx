"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentEvents } from "@/app/actions";
import { eventNames } from "process";
import { PendingCard } from "../components/PendingCard";

export default function PendingEvents() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentEvents"],
    queryFn: async () => await getRecentEvents(),
  });
  console.log(data);
const pendingEvents = data?.filter(event => event.pending);
  console.log(pendingEvents);
  return (
    <div className="flex flex-col gap-2 py-4">
      {isLoading? (
        <p>Loading...</p>
      ) : (
        <div>
          {pendingEvents?.map((event, i) => (
              <PendingCard
              eventName={event.title}
              time={event.timeRange}
              peopleInvalid={event.invalidEmails}
              peopleCurrent={event.emails}
              key={i}
              />
          ))}
        </div>
      )}
    </div>
  );
}
//{if (event.pending):
