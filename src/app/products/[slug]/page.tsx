import { notFound } from "next/navigation";

import { SiteShell } from "@/components/site-shell";
import { siteData } from "@/lib/site-data";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return siteData.products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = siteData.products.find((item) => item.slug === slug);

  return {
    title: product ? `${product.name} | Doçura da Fazenda` : "Produto | Doçura da Fazenda",
    description: product?.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const productExists = siteData.products.some((item) => item.slug === slug);

  if (!productExists) {
    notFound();
  }

  return <SiteShell page="product" productSlug={slug} />;
}
