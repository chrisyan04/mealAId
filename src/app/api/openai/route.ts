import { NextRequest, NextResponse } from "next/server";
import { getMeal } from "./openai";
import  fs, { read }  from 'fs';

export async function POST(request: NextRequest) {
  try {
    //const reqItems = await request.json();
    const reqItems = "Predictions for Rice (coarse) in 2025:\
    2023-11-15 00:00:00: 0.5743846914023162\
    2023-11-16 00:00:00: 0.5743846914023162\
    Predictions for Oil (palm) in 2025:\
    2023-11-15 00:00:00: 0.844185166567564\
    2023-11-16 00:00:00: 0.844185166567564\
    Predictions for Wheat flour in 2025:\
    2023-11-15 00:00:00: 0.5957383689135314\
    2023-11-16 00:00:00: 0.5957383689135314\
    Predictions for Lentils (masur) in 2025:\
    2023-11-15 00:00:00: 0.7859751289188862\
    2023-11-16 00:00:00: 0.7859751289188862\
    Predictions for Rice (medium grain) in 2025:\
    2023-11-15 00:00:00: 0.6013576381504536\
    2023-11-16 00:00:00: 0.6013576381504536\
    Predictions for Rice (coarse, BR-8/ 11/, Guti Sharna) in 2025:\
    2023-11-15 00:00:00: 0.5909768600612879\
    2023-11-16 00:00:00: 0.5909768600612879\
    Predictions for Wheat in 2025:\
    2023-11-15 00:00:00: 0.5570062962025405\
    2023-11-16 00:00:00: 0.5570062962025405\
    Predictions for Rice (coarse, Guti Sharna) in 2025:\
    2023-11-15 00:00:00: 0.5769773926436902\
    2023-11-16 00:00:00: 0.5769773926436902"
    let response = "";
    while(true){
      try{
        response = await getMeal(reqItems) || "";
        let tmpStr = JSON.parse(response);
        break;
      }
      catch(error:any){
        console.log("Getting new response");
      }
    }
    
    console.log("\n\n\nGpt Response: ", response);

    fs.writeFile("gpt", response, (err:any) => {
        if (err) {
          console.error('Error writing file:', err);
          return;
        }
        console.log('String successfully stored in the file.');
      });

    return NextResponse.json(
        {
            message: "Gpt Response Gotten",
        },
        { status: 201 }
      );
  } catch (error: any) {
    console.log("Error: ", error);
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { type: "UnauthorizedError", error: "Invalid request" },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: ` caught ${error.message}` }, { status: 400 });
  }
}

function readPrompt() {
    return new Promise((resolve, reject)=>{
        fs.readFile("gpt", 'utf8', (err, data) => {
            if (err) {
                reject(`Error reading file: ${err}`);
        }
        resolve(data);
        });
    });
}

export async function GET() {
    try {
        let data = await readPrompt();
        console.log("Huh: ", data)
        return NextResponse.json({'strResponse': data}, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
  }