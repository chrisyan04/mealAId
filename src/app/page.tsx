"use client";

import Navbar from "@/components/Navbar";

import Landing from "@/components/Landing";
import { NextUIProvider, button } from "@nextui-org/react";
import { model } from "mongoose";


export default function Home() {
  const buttonClicked = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("clicked")

    const formData = new FormData(event.currentTarget);
    let formObject: { [key: string]: FormDataEntryValue[] } = {};

    let modelResponse = await fetch(`/api/model?country=${formObject.country}&year=${formObject.year}&month=${formObject.month}`);
      if (!modelResponse.ok) {
        throw new Error("Model didnt return the value");
      }
    let itemDict = await modelResponse.json();
     console.log(JSON.stringify(itemDict.modelResponse));
    await fetch("/api/openai", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(JSON.stringify(itemDict.modelResponse)),
    });
    
    const response = await fetch("/api/openai");
    if(!response.ok){
      console.log("Error Reading OpenAI Response.")
    }else{
      const data = await response.json();
      console.log("Front end response: ", data);
    }
    
  }

  return (
    <NextUIProvider>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Landing />
        <form onSubmit={buttonClicked}>
          <button type="submit" className="btn btn-success">Click me!</button>
        </form>
      </main>
    </NextUIProvider>
  );
}