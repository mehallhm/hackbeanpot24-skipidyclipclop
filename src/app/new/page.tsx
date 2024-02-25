import Form from "./Form";
import React from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");

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
      <Form />
    </div>
  );
}
