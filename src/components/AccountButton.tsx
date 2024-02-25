import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getServerSession } from "next-auth";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/nextauth";

export async function AccountButton() {
  const session = await getServerSession(authOptions);
  async function action() {
    "use server";
    redirect("/api/auth/signin");
  }

  if (!session) {
    return (
      <form action={action}>
        <Button className="text-xl h-14" type="submit">
          Sign in
        </Button>
      </form>
    );
  }
  return (
    <div className="container mx-auto flex space-x-4">
      <Avatar>
        <AvatarImage
          src={"https://avatar.vercel.sh/" + session?.user?.name}
          alt="Avatar"
        />
        <AvatarFallback>
          {session?.user?.name?.substring(0, 1) +
            " " +
            session?.user?.name?.substring(
              session?.user?.name?.indexOf(" "),
              session?.user?.name?.indexOf(" ") + 1
            )}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
