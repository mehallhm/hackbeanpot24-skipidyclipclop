import { useQuery } from "@tanstack/react-query";
import { getRecentEvents } from "@/app/actions";

export default function RecentEvents() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentEvents"],
    queryFn: getRecentEvents,
  });
}
