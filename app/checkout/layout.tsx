import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - E-Store",
  description:
    "Complete your purchase securely with our easy checkout process.",
  robots: "noindex, nofollow", // Don't index checkout pages
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
