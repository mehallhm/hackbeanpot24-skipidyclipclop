import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Providers from "@/app/Providers";
import type { ReactNode } from "react";
import { Signika } from "next/font/google";

const s = Signika({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Let's Link",
  description: "Link up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={s.className}>{children}</body>
      </html>
    </Providers>
  );
}
