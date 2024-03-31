import React, { useState } from "react";

import { Select, SelectItem, Button } from "@nextui-org/react";

export default function Input() {
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (country == "" || meal == "" || year == 0 || month == 0) {
      setErr(true);
      return;
    }

    setErr(false);
  };

  return (
    <div className="w-full flex flex-col justify-center gap-4 justify-items-center mt-24">
      <h2 className="text-2xl text-blue-600">Generate a Meal:</h2>
      <div className="w-full flex flex-col gap-4">
        <Select
          key="country"
          label="Country"
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
          key="country"
          label="Meal Type"
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
      <Button onClick={handleSubmit} className="w-full" color="primary">
        Generate
      </Button>
    </div>
  );
}
