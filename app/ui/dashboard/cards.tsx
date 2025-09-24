import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  collected: BanknotesIcon,
  winning: ArrowTrendingUpIcon,
  losing: ArrowTrendingDownIcon,
};

export default async function CardWrapper() {
  const {
    numberOfTrades,
    numberOfWinningTrades,
    numberOfLosingTrades,
    biggestWinInPercentage,
  } = await fetchCardData();
  return (
    <>
      <Card title="Total trades" value={numberOfTrades} type="collected" />
      <Card
        title="Winning trades"
        value={numberOfWinningTrades}
        type="winning"
      />
      <Card title="Losing trades" value={numberOfLosingTrades} type="losing" />
      <Card
        title="Biggest profit %"
        value={biggestWinInPercentage}
        type="collected"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "winning" | "losing" | "collected";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
