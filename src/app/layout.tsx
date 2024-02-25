import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Providers from "@/app/Providers";

export const metadata: Metadata = {
  title: "Let's Link",
  description: "Link up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={GeistSans.className}>{children}</body>
      </html>
    </Providers>
  );
}
