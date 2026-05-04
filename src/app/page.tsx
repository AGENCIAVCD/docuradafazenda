import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Doçura da Fazenda",
  description:
    "Doce de leite mineiro artesanal, empório em Cambuí e linha completa para consumo, presente e revenda.",
  openGraph: {
    title: "Doçura da Fazenda",
    description:
      "Doce de leite mineiro artesanal, empório em Cambuí e linha completa para consumo, presente e revenda.",
    images: ["/assets/images/logo.png"],
  },
  twitter: {
    title: "Doçura da Fazenda",
    description:
      "Doces artesanais de tradição mineira, com linha completa para consumo e revenda.",
    images: ["/assets/images/logo.png"],
  },
};

export default function Home() {
  return <SiteShell page="home" />;
}
