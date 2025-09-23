import { fetchActiveTrades } from "../lib/data";
import { lusitana } from "@/app/ui/fonts";
import clsx from "clsx";
import { formatCurrency } from "../lib/utils";
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
                        {trade.asset}
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
                      {formatCurrency(trade.buy)}
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

  // return (
  //   <div className="flex w-full flex-col md:col-span-4">
  //     <h3 className="text-lg font-medium">Active</h3>
  //     <div className="inline-block min-w-full align-middle">
  //       <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
  //         <div className="md:hidden">
  //           {activeTrades?.map((trade) => (
  //             <div
  //               key={trade.id}
  //               className="mb-2 w-full rounded-md bg-white p-4"
  //             >
  //               <div className="flex items-left justify-between border-b pb-4">
  //                 <div>
  //                   <div className="mb-2 flex items-center">
  //                     <p>{trade.asset}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="flex flex-col w-full items-center justify-between pt-4">
  //                 <div>
  //                   <p className="text-xl font-medium">
  //                     {formatCurrency(trade.buy)}
  //                   </p>
  //                 </div>
  //                 <div>
  //                   <UpdateForm tradeId={trade.id} />
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //         <table className="hidden min-w-full text-gray-900 md:table">
  //           <thead className="rounded-lg text-left text-sm font-normal">
  //             <tr>
  //               <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
  //                 Asset
  //               </th>
  //               <th scope="col" className="px-3 py-5 font-medium">
  //                 Entry
  //               </th>
  //               <th scope="col" className="px-3 py-5 font-medium">
  //                 Exit
  //               </th>
  //             </tr>
  //           </thead>
  //           <tbody className="bg-white">
  //             {activeTrades?.map((trade) => (
  //               <tr
  //                 key={trade.id}
  //                 className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
  //               >
  //                 <td className="whitespace-nowrap py-3 pl-6 pr-3">
  //                   <div className="flex items-center gap-3">
  //                     <p>{trade.asset}</p>
  //                   </div>
  //                 </td>
  //                 <td className="whitespace-nowrap px-3 py-3">
  //                   {formatCurrency(trade.buy)}
  //                 </td>
  //                 <td className="whitespace-nowrap px-3 py-3">
  //                   <UpdateForm tradeId={trade.id} />
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     </div>
  //   </div>
  // );
}
