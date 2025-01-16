import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Team Fight Tactics Head to Head Battle",
  description:
    "Challenge your friends to a Team Fight Tactics challenge and prove your worth!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Head>
            <meta
              property="og:title"
              content="Team Fight Tactics P2P Battle"
            />
            <meta
              property="og:description"
              content="Join the battle and prove your worth !"
            />
            <meta
              property="og:image"
              content="https://0563-152-59-145-69.ngrok-free.app/image.png"
            />
            <meta property="og:url" content="https://0563-152-59-145-69.ngrok-free.app/pages/challenge?player=2" />
            <meta property="og:type" content="website" />
          </Head>
          {children}
      </body>
    </html>
  );
}
