import { AccountButton } from "@/components/AccountButton";
import TopTitle from "@/components/TopTitle";
import { Button } from "@/components/ui/button";
import React from "react";
import RecentEvents from "@/app/RecentEvents";
import PendingEvents from "@/app/PendingEvents";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import { SignInButton } from "@/components/SignInButton";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session)
    return (
      <div className="w-full p-8">
        <div className="items-center">
          <TopTitle />
        </div>
        <div className="gap-2 py-4 w-full grid items-center">
          <SignInButton />
        </div>
      </div>
    ); 

  return (
    <div className="w-full p-8">
      <div className="flex pl-2">
        <TopTitle />
        <AccountButton />
      </div>
      <div className="flex flex-col gap-2 py-4">
        <Link href="/new" className="flex w-full justify-center">
          <Button className="relative flex mt-3 h-16 text-2xl place-items-center w-56 bg-blue-500 hover:bg-blue-700 text-white">
            Create Event
          </Button>
        </Link>
      </div>
      <div>
        <h1 className="text-2xl text-left pl-8 mt-7">Pending Requests</h1>
        <PendingEvents />
      </div>
      <div>
        <h1 className="text-2xl text-left pl-8 mt-7">History</h1>
        <RecentEvents />
      </div>
    </div>
  );
}
