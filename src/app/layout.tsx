import type { Metadata } from "next";
import { Londrina_Solid, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-body",
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-display",
  weight: ["300", "400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://docuradafazenda.vercel.app"),
  title: {
    default: "Doçura da Fazenda",
    template: "%s | Doçura da Fazenda",
  },
  description:
    "Doce de leite mineiro artesanal, empório em Cambuí e linha completa para consumo, presente e revenda.",
  applicationName: "Doçura da Fazenda",
  keywords: [
    "Doçura da Fazenda",
    "doce de leite mineiro",
    "doces artesanais",
    "Cambuí MG",
    "empório mineiro",
    "revenda de doces",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://docuradafazenda.vercel.app",
    siteName: "Doçura da Fazenda",
    title: "Doçura da Fazenda",
    description:
      "Conheça a linha da Doçura da Fazenda: doces artesanais, tradição mineira e atendimento direto pelo WhatsApp.",
    images: [
      {
        url: "/assets/images/logo.png",
        width: 184,
        height: 174,
        alt: "Logo da Doçura da Fazenda",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Doçura da Fazenda",
    description:
      "Doces artesanais de tradição mineira, com linha completa para consumo e revenda.",
    images: ["/assets/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${onest.variable} ${londrinaSolid.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
