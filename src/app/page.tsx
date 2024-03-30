"use client";

import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        hello
      </main>
    </NextUIProvider>
  );
}
