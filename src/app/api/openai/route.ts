import { NextRequest, NextResponse } from "next/server";
import { getMeal } from "./openai";
import  fs, { read }  from 'fs';

export async function POST(request: NextRequest) {
  try {
    const reqItems = await request.json();
  
    const response:string = await getMeal(reqItems) || "";
    console.log("Gpt Response: ");

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