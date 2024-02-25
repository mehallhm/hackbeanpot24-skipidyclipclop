import { lobtEmails } from "@/lib/gapi/gCal";

export default async function Page() {
  async function action() {
    "use server";
    console.log("GO");
    const results = await lobtEmails(
      ["michaelhmehall@gmail.com"],
      "2024-02-22T03:46:52+0000",
      "2024-02-24T03:46:52+0000",
    );
    console.log(results);
  }

  return (
    <div>
      <form action={action}>
        <button>Go</button>
      </form>
    </div>
  );
}
