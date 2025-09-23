import { getPercentageChange } from "../lib/utils";

export default function ResultBadge({
  buy,
  sell,
}: {
  buy: number;
  sell: number;
}) {
  const result = getPercentageChange(buy, sell);
  const isPositive = result > 0;
  const isNegative = result < 0;

  const badgeClasses = isPositive
    ? "bg-green-100 text-green-600"
    : isNegative
    ? "bg-red-100 text-red-600"
    : "bg-gray-100 text-gray-600";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${badgeClasses}`}
    >
      {isPositive && "+"}
      {result.toFixed(2)}%
    </span>
  );
}
