import React, { use } from "react";

import Input from "../MealGeneration";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useUser } from "@auth0/nextjs-auth0/client";
import MealGeneration from "../MealGeneration";

export default function Landing() {
  const { user } = useUser();

  return (
    <section id="landing" className="max-w-4xl">
      <h1 className="text-5xl font-bold text-blue-600">
        From Wallet to Plate, Meal Aid Delivers Nutritious Savings!
      </h1>
      <div className="gap-12 grid grid-cols-3 mt-14">
        <Card className="py-4">
          <CardHeader>
            <p className="text-4xl font-bold">
              <span className="text-blue-500">3B+</span> People
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>unable to afford a healthy diet</p>
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader>
            <p className="text-4xl font-bold text-blue-500">40%</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>increase in global food prices</p>
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader>
            <p className="text-4xl font-bold">
              {" "}
              <span className="text-blue-500">11M</span> Deaths
            </p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>linked to poor diet and nutrition</p>
          </CardBody>
        </Card>
      </div>
      <p className="mt-14">
        <span className="text-blue-500">Meal Aid</span> is dedicated to
        supporting individuals facing financial constraints by offering
        personalized, budget-friendly{" "}
        <span className="text-blue-500">meal recommendations</span>. We
        recognize the challenges of stretching limited resources, which is why
        we specialize in providing{" "}
        <span className="text-blue-500">nutritious</span> meal options tailored
        to tight budgets. With Meal Aid, you can enjoy satisfying meals without
        breaking the bank, ensuring that everyone has access to{" "}
        <span className="text-blue-500">affordable</span>, nourishing food
        choices. Let us be your partner in making healthy eating{" "}
        <span className="text-blue-500">accessible</span>
        to all.
      </p>
      {/* <div className="mt-20">
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              area: true,
            },
          ]}
          width={500}
          height={300}
        />
      </div> */}
      {user ? <MealGeneration /> : <></>}
    </section>
  );
}
