"use client";

import Navbar from "@/components/Navbar";
import { NextUIProvider } from "@nextui-org/react";
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import placeholder from "@/public/placeholder.jpeg";
import { SearchIcon } from "./SearchIcon";

interface Meal {
  _id: string;
  email: string;
  mealName: string;
  country: string;
  ingredients: string[];
  mealDescription: string;
  price: number;
}

export default function Home() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const { user, isLoading } = useUser();
  const [search, setSearch] = useState("");
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/meals");
        const data: Meal[] = await response.json();
        if (user?.email) {
          const filteredData = data.filter((meal) => meal.email === user.email);
          setMeals(filteredData);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (!isLoading) {
      fetchData();
    }
  }, [user, isLoading]);

  const filteredMeals = meals.filter((meal) =>
    meal.mealName.toLowerCase().includes(search.toLowerCase())
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <NextUIProvider>
      <Navbar />
      <main className="h-auto flex flex-col items-center justify-center p-8">
        <div className="pb-6 text-5xl font-bold text-blue-700/80">
          <p>Saved Meals</p>
        </div>
        <div className="dark pb-4 grid grid-cols-1 gap-4 place-items-center">
          <Input
            label="Search A Meal"
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focused=true]:bg-default-200/50",
                "dark:group-data-[focused=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search ..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            onChange={(e) => setSearch(e.target.value)}
            onClear={() => setSearch("")}
            className="w-[400px]"
          />
        </div>
        <div className="grid grid-cols-5 place-items-center gap-8">
          {filteredMeals.map((meal, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => {
                setSelectedMeal(meal);
                onOpen();
              }}
              className="w-[200px] p-4"
            >
              <CardBody className="overflow-visible bg-black/50 rounded-lg text-white p-2">
                <p className="text-center">{meal.mealName}</p>
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>${meal.price} USD</b>
                <p>{meal.country}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
        {selectedMeal && (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <div>
                  <ModalHeader className="flex flex-col gap-1">
                    {selectedMeal.mealName}
                  </ModalHeader>
                  <ModalBody>
                    <p>{selectedMeal.mealDescription}</p>
                    <p>Ingredients: {selectedMeal.ingredients.join(", ")}</p>
                    <p>Price: ${selectedMeal.price} USD</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Remove
                    </Button>
                  </ModalFooter>
                </div>
              )}
            </ModalContent>
          </Modal>
        )}
      </main>
    </NextUIProvider>
  );
}
