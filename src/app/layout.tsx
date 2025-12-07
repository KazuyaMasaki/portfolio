import type { Metadata } from "next";
import { Varela_Round, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const varelaRound = Varela_Round({
  weight: "400",
  variable: "--font-varela",
  subsets: ["latin"],
});

const mPlusRounded = M_PLUS_Rounded_1c({
  weight: ["400", "700"],
  variable: "--font-mplus",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI-Native Frontend Engineer Portfolio",
  description: "Portfolio of an AI-Native Frontend Engineer specializing in Web and Unity.",
};

import { GameProvider } from "@/context/GameContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${varelaRound.variable} ${mPlusRounded.variable} antialiased bg-cream text-gray-900 font-sans`}
      >
        <GameProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </GameProvider>
      </body>
    </html>
  );
}
