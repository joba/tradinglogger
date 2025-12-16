import Image from "next/image";
import { lusitana } from "./fonts";

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const iconSize = size === "lg" ? 44 : 32;
  const textSize = size === "lg" ? "text-3xl md:text-5xl" : "text-xl";

  return (
    <div className="flex items-center gap-3">
      <Image
        src="/tradingLogger.png"
        alt="TradingLogger"
        width={iconSize}
        height={iconSize}
      />

      <p
        className={`${lusitana.className} ${textSize} text-gray-50 md:leading-normal`}
      >
        TradingLogger
      </p>
    </div>
  );
}
