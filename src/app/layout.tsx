import type { Metadata } from "next";
import { Londrina_Solid, Onest } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-sans",
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
      className={`${onest.variable} ${londrinaSolid.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
