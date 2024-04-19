import { ReportsDialog } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="uppercase text-xl ">Report Dialog</h2>
      <ReportsDialog />
    </main>
  );
}
