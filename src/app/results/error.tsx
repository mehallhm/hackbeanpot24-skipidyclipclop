"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="p-4 h-screen w-screen items-center grid">
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-5 w-5" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error.message}</p>
          <div className="flex gap-2 justify-between">
            <Button onClick={reset} variant="secondary">
              Try again
            </Button>

            <Button onClick={() => router.push("/")}>Go home</Button>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
