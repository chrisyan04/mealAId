import { NextRequest, NextResponse } from "next/server";

import connectDB from "@/db/config";
import Meals, { type IMeals } from "@/db/models/meal";

let submission: Omit<IMeals, "code"> = {
  email: "",
  mealName: "",
  country: "",
  ingredients: [],
  mealDescription: "",
  price: 0,
};

export async function POST(request: NextRequest) {
  try {
    connectDB();

    submission = await request.json();

    await new Meals({ ...submission }).save();

    return NextResponse.json(
      {
        message: `${submission.mealName} created successfully for ${submission.email}!`,
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { type: "UnauthorizedError", error: "Invalid request" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    connectDB();

    const meals = await Meals.find({});

    return NextResponse.json(meals, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
