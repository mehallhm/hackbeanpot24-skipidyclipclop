import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function refreshToken(userId: string): Promise<string> {
  const client = await clientPromise;
  const usersDb = client.db("auth");
  const collection = usersDb.collection("accounts");
  const user = await collection.findOne({ userId: new ObjectId(userId) });

  if (!user) {
    throw new Error("User not found");
  }

  const refresh_token = user.refresh_token;

  const resp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token,
    }),
  });

  const data = await resp.json();
  const newToken = data.access_token;
  const newExpires = new Date(Date.now() + data.expires_in * 1000);

  const result = await collection.updateOne(
    { userId: new ObjectId(userId) },
    { $set: { access_token: newToken, expires_at: newExpires } },
  );

  if (result.modifiedCount !== 1) {
    throw new Error("Failed to update access token");
  }

  return newToken;
}
