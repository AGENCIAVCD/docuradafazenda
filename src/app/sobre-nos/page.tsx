import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: "Conheça a história da Doçura da Fazenda, tradição familiar mineira e produção artesanal desde 1998.",
  openGraph: {
    title: "Sobre nós | Doçura da Fazenda",
    description: "Conheça a história da Doçura da Fazenda, tradição familiar mineira e produção artesanal desde 1998.",
    images: ["/assets/images/logo.png"],
  },
};

export default function AboutPage() {
  return <SiteShell page="about" />;
}
