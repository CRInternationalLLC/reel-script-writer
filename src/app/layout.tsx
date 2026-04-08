import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reel Script Writer | Metodo Consulting Revolution",
  description:
    "Genera script per Instagram Reels per il tuo personal brand con l'AI, seguendo il metodo Consulting Revolution.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body
        className={`${inter.className} bg-dark text-white min-h-screen antialiased`}
      >
        <div className="flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  );
}
