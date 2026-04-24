import type { Metadata } from "next";
import { Londrina_Solid, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  weight: ["400", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const londrinaSolid = Londrina_Solid({
  variable: "--font-display",
  weight: ["300", "400", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Doçura da Fazenda",
  description:
    "Reconstrução em Next.js do site da Doçura da Fazenda, em português do Brasil e com assets locais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${londrinaSolid.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
