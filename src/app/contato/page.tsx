import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Doçura da Fazenda pelo WhatsApp, telefone ou visite o empório em Cambuí, Minas Gerais.",
  openGraph: {
    title: "Contato | Doçura da Fazenda",
    description: "Fale com a Doçura da Fazenda pelo WhatsApp, telefone ou visite o empório em Cambuí, Minas Gerais.",
    images: ["/assets/images/logo.png"],
  },
};

export default function ContactPage() {
  return <SiteShell page="contact" />;
}
