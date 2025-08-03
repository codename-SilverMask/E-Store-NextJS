import { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  // Generate static params for all products
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const products: Product[] = await res.json();

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} - E-Store`,
    description: product.description,
    keywords: `${product.category}, ${product.title}, ecommerce, online shopping`,
    openGraph: {
      title: `${product.title} - E-Store`,
      description: product.description,
      images: [product.image],
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
