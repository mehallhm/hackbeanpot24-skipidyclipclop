"use client";
import { useQuery } from "@tanstack/react-query";
import { getRecentEvents } from "@/app/actions";

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
            <div key={i}>
              <h2>{event.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
