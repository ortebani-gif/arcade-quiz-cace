import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AudioProvider } from "@/context/AudioProvider";
import { QuizProvider } from "@/context/QuizProvider";
import ArcadeBackground from "@/components/ArcadeBackground";

const pressStart = localFont({
  src: "../../public/fonts/PressStart2P-Regular.ttf",
  variable: "--font-pixel",
  display: "swap",
});

const jetbrains = localFont({
  src: "../../public/fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-mono",
  weight: "100 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Which Game Character Are You?",
  description: "24 questions. Arcade legends. One match.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pressStart.variable} ${jetbrains.variable}`}>
      <body>
        <AudioProvider>
          <QuizProvider>
            <ArcadeBackground />
            <main className="screen">{children}</main>
          </QuizProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
