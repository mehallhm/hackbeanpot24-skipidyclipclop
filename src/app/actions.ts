"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/nextauth";
import clientPromise from "@/lib/mongodb";

export async function getRecentEvents() {
  const user = await getServerSession(authOptions);

  const client = await clientPromise;
  const db = client.db("events");
  const events = db.collection("events");
  const data = await events
    .find({
      emails: user?.user?.email,
      endDateRange: { $gte: new Date() },
    })
    .toArray();
  return data
    .reverse()
    .slice(0, 5)
    .map((e) => ({
      title: e.title,
      id: e._id,
      startDateRange: e.startDateRange,
      endDateRange: e.endDateRange,
      invalidEmails: e.invalidEmails,
      pending: e.pending,
      timeRange: e.timeRange,
      emails: e.emails,
      length: e.length,
    }));
}
