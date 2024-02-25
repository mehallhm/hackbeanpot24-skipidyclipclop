import clientPromise from "@/lib/mongodb";
import type { ScheduleEvent } from "@/lib/types";

export async function getUser(email: string) {
  const client = await clientPromise;
  const db = client.db("auth");
  const users = db.collection("users");
  return await users.findOne({ email });
}

export async function getUsers(emails: string[]) {
  const client = await clientPromise;
  const db = client.db("auth");
  const users = db.collection("users");
  return await users.find({ email: { $in: emails } }).toArray();
}

export async function verifyUser(email: string) {
  return (await getUser(email)) !== null;
}

export async function verifyUsers(emails: string[]) {
  const users = await getUsers(emails);
  return emails.reduce((arr, email) => {
    if (users.every((u) => u.email !== email)) return [email, ...arr];
    else return arr;
  }, [] as string[]);
}

export async function revalidateOutstandingEvents(email: string) {
  const client = await clientPromise;
  const db = client.db("events");
  const events = db.collection("events");
  // Get all events where the current email is invalid
  const outstanding = await events
    .find({ invalidEmails: email, pending: true })
    .toArray();

  for (const event of outstanding) {
    // revalidate all emails for the event
    const verified = await verifyUsers(event.emails);
    if (verified.length === 0) {
      // if all emails are verified, mark the event as not pending
      await events.updateOne(
        { _id: event._id },
        { $set: { pending: false, invalidEmails: [] } },
      );
    } else {
      // otherwise, update the invalid emails
      await events.updateOne(
        { _id: event._id },
        { $set: { invalidEmails: verified, pending: verified.length === 0 } },
      );
    }
  }

  console.log("Revalidated outstanding events");
}

export async function createEvent(event: ScheduleEvent) {
  const client = await clientPromise;
  const db = client.db("events");
  const events = db.collection("events");
  return await events.insertOne(event);
}
