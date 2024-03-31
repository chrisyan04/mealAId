"use client";

import Navbar from "@/components/Navbar";

import Landing from "@/components/Landing";
import { NextUIProvider, button } from "@nextui-org/react";
import { model } from "mongoose";

export default function Home() {
  return (
    <NextUIProvider>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Landing />
      </main>
    </NextUIProvider>
  );
}
