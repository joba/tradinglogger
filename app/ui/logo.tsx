import { lusitana } from "./fonts";

export default function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const iconSize = size === "lg" ? 48 : 32;
  const textSize = size === "lg" ? "text-3xl md:text-5xl" : "text-xl";

  return (
    <div className="flex items-center gap-3">
      {/* Minimalistic chart icon */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Circular background */}
        {/* <circle cx="20" cy="20" r="18" fill="white" opacity="0.15" /> */}

        {/* Trading chart bars - ascending pattern */}
        <rect x="8" y="24" width="4" height="8" rx="1" fill="white" />
        <rect x="14" y="20" width="4" height="12" rx="1" fill="white" />
        <rect x="20" y="14" width="4" height="18" rx="1" fill="white" />
        <rect x="26" y="10" width="4" height="22" rx="1" fill="white" />

        {/* Upward trend line */}
        <path
          d="M 9 26 L 15 22 L 21 16 L 27 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>

      <p
        className={`${lusitana.className} ${textSize} text-gray-50 md:leading-normal`}
      >
        TradingLogger
      </p>
    </div>
  );
}
