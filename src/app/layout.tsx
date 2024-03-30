import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "./globals.css";
import { User } from "@nextui-org/react";

const mont = Montserrat({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TBD",
  description: "Genesis Gen AI Hackathon Project",
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
