import clientPromise from "@/lib/mongodb";

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
