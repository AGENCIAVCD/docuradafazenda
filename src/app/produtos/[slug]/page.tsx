import type { Metadata } from "next";
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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = siteData.products.find((item) => item.slug === slug);
  const title = product ? product.name : "Produto";
  const description =
    product?.description ??
    "Conheça a linha artesanal da Doçura da Fazenda e fale com a equipe pelo WhatsApp.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Doçura da Fazenda`,
      description,
      images: ["/assets/images/logo.png"],
    },
    twitter: {
      title: `${title} | Doçura da Fazenda`,
      description,
      images: ["/assets/images/logo.png"],
    },
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
