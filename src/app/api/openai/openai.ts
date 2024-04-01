import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

//@ts-nocheck
const openai = new OpenAI({
  //@ts-nocheck
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

function buildPrompt(mealDict:any){
    const prompt = ` 
I have a few ingredients, description and price but also I'll first tell you the country and the meal type
. Create a suitable meal using that data and the ingredients. Here are the ingredients and prices:
${mealDict}

I need you to return a JSON object with the following format:
{meal: 'meal name', ingredients: ['ingredient1', 'ingredient2', ...], price: 'price of meal', description: 'description of meal'}

PRICE MUST BE A NUMBER not a description, up to 2 decimal places.

Your job is to create a cost effective and nutritional meal using the ingredients you are given and also add any other necessary ones as well. Please ensure that the ingredients you are given are the foundation of the meal and that it's healthy.


Remember I need you to return a JSON with the following format:
{meal: 'meal name', ingredients: ['ingredient1', 'ingredient2', ...], price: 'price of meal', description: 'description of meal'}

generate the meal description using the ingredients you are given and its nutritional values.
`
    return prompt
}

export async function getMeal(mealDict:any) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{"role":"system","content":"You are a frugal nutritionist, your job is to create cost effective and nutritional meal using the ingredients you are given. You need to return the following as a JSON object: {meal: 'meal name', ingredients: ['ingredient1', 'ingredient2', ...], price: 'price of meal', description: 'description of meal'}"},
    {"role":"user","content":buildPrompt(mealDict)}],
    model: "gpt-3.5-turbo",
  });
  return chatCompletion.choices[0].message.content;
}