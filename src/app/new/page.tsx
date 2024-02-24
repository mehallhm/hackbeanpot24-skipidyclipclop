import Add from "./Add";

export const metadata = {
  title: "New Event",
};
export default function Page() {
  return (
    <div className="w-full flex flex-col items-center p-4">
      <h2>Step 7</h2>
      <p>Hello World</p>
      <Add />
    </div>
  );
}
