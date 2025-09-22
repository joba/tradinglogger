import type { Metadata } from "next";
import "./globals.css";
import { inter } from "./ui/fonts";

export const metadata: Metadata = {
  title: "Trade Logs",
  description: "Log your day trades with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
