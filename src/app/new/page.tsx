import Form from "./Form";
import React from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import Link from "next/link";

type TimeOptions = "Morning" | "Noon" | "Afternoon" | "Evening" | "Night";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

  const minDate = new Date(searchParams?.minDate as string);
  const maxDate = new Date(searchParams?.maxDate as string);
  const eventLength = searchParams?.eventLength as string;
  const title = searchParams?.title as string;

  const timeRange = searchParams?.timeRange as TimeOptions;

  const emailList = searchParams?.emails as string;
  if (
    emailList === undefined ||
    minDate === undefined ||
    maxDate === undefined ||
    eventLength === undefined ||
    title === undefined ||
    timeRange === undefined
  ) {
    return (
      <div className="p-4 w-full pt-5">
        <Link href="/">
          <Button variant="outline" size="icon" className="mr-auto">
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          New Event
        </h1>
        <Form
          iEmails={[]}
          iStartDate={undefined}
          iEndDate={undefined}
          iEventLength={""}
          iTimeRange={"Morning"}
          iTitle={""}
        />
      </div>
    );
  }
  const emails = emailList.split(",");

  return (
    <div className="p-4 w-full pt-5">
      <Link href="/">
        <Button variant="outline" size="icon" className="mr-auto">
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
      </Link>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
        New Event
      </h1>
      <Form
        iEmails={emails}
        iStartDate={minDate}
        iEndDate={maxDate}
        iEventLength={eventLength}
        iTimeRange={timeRange}
        iTitle={title}
      />
    </div>
  );
}
