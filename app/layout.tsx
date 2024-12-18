import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import "./globals.css";
import React from "react";

const fira_sans = Fira_Sans({
  subsets: ['latin'],
  weight: ['400','500','600'],
  variable: '--font-fira-sans'
})

export const metadata: Metadata = {
  title: "Fiya",
  description: "A place you look for all your dehydrated foods.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${fira_sans.className} antialiased`} >
        {children}
      </body>
    </html>
  );
}
