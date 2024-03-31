import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";

const mont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Meal Aid",
  description: "Genesis Gen AI Hackathon Project - Meal Aid",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={mont.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
