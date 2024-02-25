import ResultsDisplay from "@/app/results/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import SkeletonResults from "@/app/results/SkeletonResults";

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
      <SkeletonResults params={searchParams} />
    </div>
  );
}
