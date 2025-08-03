import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "../components/ReduxProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Store - Best Products Online",
  description:
    "Discover amazing products with great prices. Shop men's clothing, women's clothing, jewelry, and electronics. Fast shipping and excellent customer service.",
  keywords:
    "ecommerce, online shopping, clothing, electronics, jewelry, fashion",
  robots: "index, follow",
  openGraph: {
    title: "E-Commerce Store - Best Products Online",
    description:
      "Discover amazing products with great prices. Shop men's clothing, women's clothing, jewelry, and electronics.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://yourstore.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
