import Steps from "@/components/Steps";
import Add from "./Add";

export const metadata = {
  title: "New Event",
};
export default function Page() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <Steps />
      <h2>Step 7</h2>
      <p>Hello World</p>
      <Add />
    </div>
  );
}
