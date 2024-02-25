import { AccountButton } from "@/components/AccountButton";
import TopTitle from "@/components/TopTitle";
import { Button } from "@/components/ui/button";
import React from "react";
import RecentEvents from "@/app/RecentEvents";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { SignInButton } from "@/components/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <div className="w-full p-4 pt-5">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Let&apos;s Link
        </h1>
        <div className="gap-2 py-4 w-full grid items-center">
          <SignInButton />
        </div>
      </div>
    );

  return (
    <div className="w-full p-4 pt-5">
      {/*<div className="p-8 pt-18 w-full flex flex-row justify-between ">*/}
      {/*</div>*/}
      <div className="flex">
        <TopTitle />
        <AccountButton />
      </div>
      <div className="flex flex-col gap-2 py-4">
        <Link href="/new" className="flex w-full justify-center">
          <Button className="">Create Event</Button>
        </Link>
        <h2 className="text-2xl font-semibold">Recent Events</h2>
        <RecentEvents />
      </div>
    </div>
  );
}
