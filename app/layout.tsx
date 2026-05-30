import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const satoshi = localFont({
  src: "../public/fonts/Satoshi-Regular.ttf",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "Skinilicious",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
