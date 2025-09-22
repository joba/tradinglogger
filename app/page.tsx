import ActiveTrades from "./ui/active-trades";
import CreateForm from "./ui/create-form";
import TradeList from "./ui/trade-list";
import { Suspense } from "react";

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <CreateForm />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <ActiveTrades />
        <Suspense key={query + currentPage} fallback={<p>Loading trades...</p>}>
          <TradeList query={query} currentPage={currentPage} />
        </Suspense>
      </div>
    </main>
  );
}
