import React, { use } from "react";

import Input from "../Input";
import Output from "../Output";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { LineChart } from "@mui/x-charts/LineChart";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Landing() {
  const { user } = useUser();

  return (
    <section id="landing">
      <h1 className="text-5xl font-bold text-blue-600">For those in need:</h1>
      <div className="gap-12 grid grid-cols-3 mt-14">
        <Card className="py-4">
          <CardHeader>
            <p>Some stat</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Some number</p>
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader>
            <p>Some stat</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Some number</p>
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader>
            <p>Some stat</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Some number</p>
          </CardBody>
        </Card>
      </div>
      <div className="mt-20">
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
      </div>
      {user ? <Input /> : <></>}
    </section>
  );
}
