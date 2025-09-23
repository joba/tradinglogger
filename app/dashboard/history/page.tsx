import { lusitana } from "@/app/ui/fonts";
import TradeList from "@/app/ui/trade-list";
import { Suspense } from "react";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages = await fetchCustomerPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Trade log</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        {/* <Search placeholder="Search customers..." /> */}
      </div>
      <Suspense key={query + currentPage} fallback={<p>Loading trades...</p>}>
        <TradeList query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
