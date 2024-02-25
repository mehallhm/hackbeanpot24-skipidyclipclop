import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import ResultsWrapper from "@/app/results/ResultsWrapper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  async function navigate() {
    "use server";
    redirect("/");
  }

  return (
    <div className="p-4 w-full pt-5">
      <form action={navigate}>
        <Button variant="outline" size="icon" className="mr-auto">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </form>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        Query Results
      </h1>
      <Suspense fallback={<Loader />}>
        <ResultsWrapper params={searchParams} />
      </Suspense>
    </div>
  );
}

function Loader() {
  return (
    <div className="flex flex-col space-y-3 py-4">
      <Skeleton className="h-24 rounded-xl" />
      <div className="space-y-6">
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
        <Skeleton className="h-6" />
        <Skeleton className="h-8" />
        <Skeleton className="h-6" />
        <Skeleton className="h-6" />
        <Skeleton className="h-8" />
        <Skeleton className="h-8" />
      </div>
    </div>
  );
}
