import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Bricolage_Grotesque } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Grain } from "@/components/effects/grain";
import { ClientProviders } from "@/components/layout/client-providers";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MeuDesign — Design inteligente, feito por si.",
    template: "%s | MeuDesign",
  },
  description:
    "Descreve a tua ideia e a IA cria o design. T-shirts, hoodies, posters, canecas e muito mais — personalizados só para ti.",
  keywords: ["design personalizado", "IA", "t-shirt", "hoodie", "poster", "impressão"],
  authors: [{ name: "MeuDesign" }],
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "MeuDesign",
    title: "MeuDesign — Design inteligente, feito por si.",
    description:
      "Descreve a tua ideia e a IA cria o design. Produtos personalizados entregues em casa.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground antialiased">
        <ClientProviders>
          <Grain />
          <Header />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
