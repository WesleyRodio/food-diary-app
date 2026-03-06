import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Loader } from "@/components/ui/loader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Food Diary App",
  description: "Your quick and easy food diary!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${geistMono.variable} bg-brand-3/20 flex h-dvh overflow-hidden font-sans antialiased`}
      >
        <main className="mx-auto my-0 flex h-dvh w-dvw max-w-115 flex-col rounded-none transition-all duration-300 sm:my-auto sm:h-[96dvh] sm:overflow-hidden sm:rounded-2xl">
          <Loader>{children}</Loader>
        </main>
      </body>
    </html>
  );
}
