import React, { useState } from "react";

import {
  Select,
  SelectItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";

export default function MealGeneration() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const countries: string[] = [
    "Bangladesh",
    "Ethipoia",
    "Haiti",
    "Indonesia",
    "India",
    "Kenya",
    "Myanmar",
    "Nigeria",
    "Pakistan",
    "Philippines",
    "Rwanda",
    "Senegal",
    "Somalia",
    "South Sudan",
    "Uganda",
    "Ukraine",
    "Yemen",
  ];
  const meals = ["Breakfast", "Lunch", "Dinner"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];

  const [country, setCountry] = useState("");
  const [meal, setMeal] = useState("");
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [err, setErr] = useState(false);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState({} as any);

  const buttonClicked = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("clicked");

    if (country == "" || meal == "" || year == 0 || month == 0) {
      setErr(true);
      return;
    }

    setErr(false);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const formObject = {
      country: formData.get("country"),
      year: formData.get("year"),
      month: formData.get("month"),
    };

    let modelResponse = await fetch(
      `/api/model?country=${formObject.country}&year=${formObject.year}&month=${formObject.month}`
    );
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
    if (!response.ok) {
      console.log("Error Reading OpenAI Response.");
    } else {
      const data = await response.json();
      console.log("Front end response: ", data);
      setData(data.strResponse);
      // setData(data);
      setParsedData(JSON.parse(data.strResponse));
    }
  };

  // Assuming parsedData has the structure:
  // {meal: 'meal name', ingredients: ['ingredient1', 'ingredient2', ...], price: 'price of meal', description: 'description of meal'}

  const saveData = async () => {
    // Map parsedData to match the structure of the submission object
    const mappedData = {
      email: user ? user.email : "", // Replace with actual email if available
      mealName: parsedData.meal,
      country: country, // Assuming 'country' state variable holds the country value
      ingredients: parsedData.ingredients,
      mealDescription: parsedData.description,
      price: parseFloat(parsedData.price), // Assuming price in parsedData is a string and needs to be converted to a number
    };

    const response = await fetch("/api/meals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mappedData),
    });

    if (response.ok) {
      console.log("Success in saving meal");
      router.push("/savedMeals");
    } else {
      console.error("Error saving data:", await response.text());
    }
  };

  return (
    <div className="flex flex-col justify-center">
      {data == "" ? (
        <form onSubmit={buttonClicked}>
          <div className="w-full flex flex-col justify-center gap-4 justify-items-center mt-24">
            <h2 className="text-2xl text-blue-600">Generate a Meal:</h2>
            <div className="w-full flex flex-col gap-4">
              <Select
                key="country"
                label="Country"
                name="country"
                placeholder="Select a country"
                className="w-full"
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </Select>
              <Select
                key="Meal Type"
                label="Meal Type"
                name="meal"
                placeholder="Select your meal"
                className="w-full"
                onChange={(e) => setMeal(e.target.value)}
              >
                {meals.map((meal) => (
                  <SelectItem key={meal} value={meal}>
                    {meal}
                  </SelectItem>
                ))}
              </Select>
              <div className="w-full flex flex-row gap-2">
                <Select
                  key="year"
                  label="Year"
                  name="year"
                  placeholder="Select year"
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {String(year)}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  key="month"
                  label="Month"
                  name="month"
                  placeholder="Select month"
                  onChange={(e) => setMonth(Number(e.target.value))}
                >
                  {months.map((month) => (
                    <SelectItem key={month} value={months.indexOf(month) + 1}>
                      {month}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <p className="text-sm text-red-700 h-5">
              {err ? "Please fill all the fields" : ""}
            </p>
            <Button
              type="submit"
              className="w-full"
              color="primary"
              isLoading={loading}
            >
              Generate
            </Button>
          </div>
        </form>
      ) : (
        <>
          <Card
            className="max-w-[400px] m-auto mt-10 mb-6"
            isPressable
            onPress={onOpen}
          >
            <CardHeader className="flex justify-center items-center p-6">
              <div>
                <p className="text-lg font-semibold">{parsedData.meal}</p>
                <p className="text-sm">{country}</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody className="p-6">
              <p className="text-sm">{parsedData.ingredients}</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center items-center p-6">
              <b className="text-lg font-semibold">${parsedData.price} USD</b>
            </CardFooter>
          </Card>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <div>
                  <ModalHeader className="flex flex-col gap-1">
                    {parsedData.meal}
                  </ModalHeader>
                  <ModalBody>
                    <p>{parsedData.description}</p>
                    <p>Ingredients: {parsedData.ingredients}</p>
                    <p>Price: ${parsedData.price} USD</p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={saveData}>
                      Save
                    </Button>
                  </ModalFooter>
                </div>
              )}
            </ModalContent>
          </Modal>
          <Button
            type="submit"
            className="w-full"
            onClick={(e) => {
              setData("");
              setCountry("");
              setMeal("");
              setYear(0);
              setMonth(0);
            }}
            color="primary"
          >
            Generate Again
          </Button>
        </>
      )}
    </div>
  );
}
