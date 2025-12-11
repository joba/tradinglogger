// Loading animation

export function CardSkeleton() {
  return (
    <div className="animate-pulse relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm">
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardsSkeleton() {
  return (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  );
}

export function ActiveTradesSkeleton() {
  return (
    <div className="animate-pulse relative overflow-hidden rounded-xl bg-gray-100 p-4 shadow-sm flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4"></div>
    </div>
  );
}

export function TradeListSkeleton() {
  return (
    <div className="animate-pulse relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <tbody>
              <tr className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                <td className="whitespace-nowrap py-3 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <p></p>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-3"></td>
                <td className="whitespace-nowrap px-3 py-3"></td>
                <td className="whitespace-nowrap px-3 py-3"></td>
                <td className="whitespace-nowrap px-3 py-3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
