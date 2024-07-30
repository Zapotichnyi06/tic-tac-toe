import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Tic Tac Toe",
    description: "Engage in the classic battle of X's and O's in the Ultimate Tic Tac Toe Showdown. Challenge friends or the AI in this modern twist on a timeless game, blending strategy, skill, and fun!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
  );
}
