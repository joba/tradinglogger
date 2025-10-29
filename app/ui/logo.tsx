import { lusitana } from "./fonts";

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const textSize = size === "lg" ? "text-5xl" : "text-xl";
  return (
    <p
      className={`${lusitana.className} ${textSize} text-gray-50 md:leading-normal`}
    >
      TradingLogger
    </p>
  );
}
