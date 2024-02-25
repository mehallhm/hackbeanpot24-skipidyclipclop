"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

interface Props {
  data: Date[];
}

export default function ResultsDisplay({ data }: Props) {
  const [results, setResults] = useState(data);

  return (
    <div className="flex flex-col gap-2 py-4">
      <Alert className="my-2">
        <RocketIcon className="w-5 h-5" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          These times work the best for most people, but not necessarily
          everyone
        </AlertDescription>
      </Alert>
      {results.map((result, i) => (
        <div
          key={result.toISOString()}
          className="border rounded p-2 flex justify-between items-center"
        >
          <p>{formatDate(result)}</p>
          <Button
            onClick={() => setResults(results.filter((_, j) => i !== j))}
            variant="secondary"
          >
            Hide
          </Button>
        </div>
      ))}
    </div>
  );
}
