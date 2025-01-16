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
  title: "League of Legends Stats Tracker",
  description:
    "Track your favorite summoners, recent matches, and champion rotations.",
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
              content="League of Legends P2P Battle"
            />
            <meta
              property="og:description"
              content="Track your favorite summoners, recent matches, and champion rotations."
            />
            <meta
              property="og:image"
              content="https://i.imgur.com/your-image-id.png"
            />
            <meta property="og:url" content="http://localhost:3000" />
            <meta property="og:type" content="website" />
          </Head>
          {children}
      </body>
    </html>
  );
}
