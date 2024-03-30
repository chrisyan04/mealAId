import { Schema, models, model } from "mongoose";

export interface IMeals {
  email: string;
  mealName: string;
  country: string;
  ingredients: string[];
  mealDescription: string;
}

const mealsSchema = new Schema<IMeals>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    mealName: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    mealDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Meals = models.Meals || model("Meals", mealsSchema);

export default Meals;
