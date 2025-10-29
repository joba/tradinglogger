import { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "TradingLogger",
  description: "Log your day trades with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
