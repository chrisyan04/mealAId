"use client";

import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import Landing from "@/components/Landing";

export default function Landing() {
  return (
    <NextUIProvider>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Landing />
      </main>
    </NextUIProvider>
  );
}
