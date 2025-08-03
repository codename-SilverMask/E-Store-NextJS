import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order History - E-Store",
  description: "View your order history and track your purchases.",
  robots: "noindex, nofollow", // Don't index personal order pages
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
