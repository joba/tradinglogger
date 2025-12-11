import { fetchActiveTrades } from "../../lib/data";
import { lusitana } from "@/app/ui/fonts";
import clsx from "clsx";
import { formatCurrency } from "../../lib/utils";
import UpdateForm from "./update-form";

export default async function ActiveTrades() {
  const activeTrades = await fetchActiveTrades();

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Active trades
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {
          <div className="bg-white px-6">
            {activeTrades.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-500">
                No active trades right now
              </p>
            )}
            {activeTrades.map((trade, i) => {
              return (
                <div
                  key={trade.id}
                  className={clsx(
                    "flex flex-col items-left justify-between py-4",
                    {
                      "border-t": i !== 0,
                    }
                  )}
                >
                  <div className="flex items-center">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold md:text-base">
                        {trade.asset} - {trade.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center justify-between py-4">
                    <p
                      className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                    >
                      Entry
                    </p>
                    <p
                      className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                    >
                      {trade.buy} kr
                    </p>
                  </div>
                  <UpdateForm trade={trade} />
                </div>
              );
            })}
          </div>
        }
      </div>
    </div>
  );
}
