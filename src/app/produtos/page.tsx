import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Explore a linha completa da Doçura da Fazenda: tabletes, pastosos, barras, displays e embalagens para revenda.",
  openGraph: {
    title: "Produtos | Doçura da Fazenda",
    description: "Explore a linha completa da Doçura da Fazenda: tabletes, pastosos, barras, displays e embalagens para revenda.",
    images: ["/assets/images/logo.png"],
  },
};

export default function ProductsPage() {
  return <SiteShell page="products" />;
}
