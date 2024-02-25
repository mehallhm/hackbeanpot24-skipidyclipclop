import { AccountButton } from "@/components/AccountButton";
import TopTitle from "@/components/TopTitle";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card, Time } from "@/components/Card"; // Fix the casing of the import statement
import { redirect } from "next/navigation";
import React from "react";
import { PendingCard } from "@/components/PendingCard";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <div className="p-8 pt-18 w-full flex flex-row justify-between ">
        <TopTitle />
        <AccountButton />
      </div>
      <a href="/new" className="flex w-full justify-center">
        <Button
          type="button"
          className="relative flex mt-3 h-24 text-2xl place-items-center w-56 bg-blue-500 hover:bg-blue-700 text-white"
        >
          Create Event
        </Button>
      </a>
      <div>
        <h1 className="text-2xl text-left mt-12 ml-8 mr-8 mb-2">
          Pending Requests
        </h1>
      </div>
    </div>
  );
}
