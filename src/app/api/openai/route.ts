import { NextRequest, NextResponse } from "next/server";
import { getMeal } from "./openai";
import  fs, { read }  from 'fs';

export async function POST(request: NextRequest) {
  try {
    //const reqItems = await request.json();
    const reqItems = "Predictions for Meat (beef) in 2025:\
    2023-11-15 00:00:00: 2.170642958574295\
    2023-11-16 00:00:00: 2.170642958574295\
    Predictions for Bread (wheat) in 2025:\
    2023-11-15 00:00:00: 1.930396490430832\
    2023-11-16 00:00:00: 1.930396490430832\
    Predictions for Meat (pork) in 2025:\
    2023-11-15 00:00:00: 2.331911262598038\
    2023-11-16 00:00:00: 2.331911262598038\
    Predictions for Sour cream in 2025:\
    2023-11-15 00:00:00: 2.1431699010181426\
    2023-11-16 00:00:00: 2.1431699010181426\
    Predictions for Sugar in 2025:\
    2023-11-15 00:00:00: 1.9433474968624116\
    2023-11-16 00:00:00: 1.9433474968624116\
    Predictions for Oil (sunflower) in 2025:\
    2023-11-15 00:00:00: 2.0428315559959414\
    2023-11-16 00:00:00: 2.0428315559959414\
    Predictions for Cabbage in 2025:\
    2023-11-15 00:00:00: 1.872241140356064\
    2023-11-16 00:00:00: 1.872241140356064\
    Predictions for Bread (rye) in 2025:\
    2023-11-15 00:00:00: 1.9462155433082582\
    2023-11-16 00:00:00: 1.9462155433082582\
    Predictions for Fat (salo) in 2025:\
    2023-11-15 00:00:00: 2.3081471891593934\
    2023-11-16 00:00:00: 2.3081471891593934\
    Predictions for Carrots in 2025:\
    2023-11-15 00:00:00: 1.9919441078376772\
    2023-11-16 00:00:00: 1.9919441078376772\
    Predictions for Buckwheat grits in 2025:\
    2023-11-15 00:00:00: 1.8750226256370546\
    2023-11-16 00:00:00: 1.8750226256370546\
    Predictions for Wheat flour (first grade) in 2025:\
    2023-11-15 00:00:00: 1.879901601200104\
    2023-11-16 00:00:00: 1.879901601200104\
    Predictions for Milk in 2025:\
    2023-11-15 00:00:00: 1.9527858997631073\
    2023-11-16 00:00:00: 1.9527858997631073\
    Predictions for Rice in 2025:\
    2023-11-15 00:00:00: 1.9456571428966523\
    2023-11-16 00:00:00: 1.9456571428966523\
    Predictions for Beetroots in 2025:\
    2023-11-15 00:00:00: 1.8070802010536196\
    2023-11-16 00:00:00: 1.8070802010536196\
    Predictions for Potatoes in 2025:\
    2023-11-15 00:00:00: 1.92671197804451\
    2023-11-16 00:00:00: 1.92671197804451\
    Predictions for Meat (mixed, sausage) in 2025:\
    2023-11-15 00:00:00: 2.146968682231903\
    2023-11-16 00:00:00: 2.146968682231903\
    Predictions for Eggs in 2025:\
    2023-11-15 00:00:00: 1.8709358465290071\
    2023-11-16 00:00:00: 1.8709358465290071\
    Predictions for Meat (chicken, whole) in 2025:\
    2023-11-15 00:00:00: 2.200798401012421\
    2023-11-16 00:00:00: 2.200798401012421\
    Predictions for Onions in 2025:\
    2023-11-15 00:00:00: 1.979602467737198\
    2023-11-16 00:00:00: 1.979602467737198\
    Predictions for Curd in 2025:\
    2023-11-15 00:00:00: 2.4059182271099093\
    2023-11-16 00:00:00: 2.4059182271099093\
    Predictions for Pasta in 2025:\
    2023-11-15 00:00:00: 1.8347874591445923\
    2023-11-16 00:00:00: 1.8347874591445923\
    Predictions for Butter in 2025:\
    2023-11-15 00:00:00: 1.0824818473100664\
    2023-11-16 00:00:00: 1.0824818473100664\
    Predictions for Fish (frozen) in 2025:\
    2023-11-15 00:00:00: 2.311990262184143\
    2023-11-16 00:00:00: 2.311990262184143\
    Predictions for Meat (chicken, fillet) in 2025:\
    2023-11-15 00:00:00: 2.365044166412354\
    2023-11-16 00:00:00: 2.365044166412354\
    Predictions for Bread (first grade flour) in 2025:\
    2023-11-15 00:00:00: 1.8436733267593386\
    2023-11-16 00:00:00: 1.8436733267593386\
    Predictions for Buckwheat in 2025:\
    2023-11-15 00:00:00: 1.8826946144866945\
    2023-11-16 00:00:00: 1.8826946144866945\
    Predictions for Wheat flour in 2025:\
    2023-11-15 00:00:00: 1.9490969379711152\
    2023-11-16 00:00:00: 1.9490969379711152\
    Predictions for Semolina in 2025:\
    2023-11-15 00:00:00: 1.9409496716976167\
    2023-11-16 00:00:00: 1.9409496716976167\
    Predictions for Barley in 2025:\
    2023-11-15 00:00:00: 1.841962125787735\
    2023-11-16 00:00:00: 1.841962125787735\
    Predictions for Millet in 2025:\
    2023-11-15 00:00:00: 1.8845848029136658\
    2023-11-16 00:00:00: 1.8845848029136658\
    Predictions for Apples in 2025:\
    2023-11-15 00:00:00: 1.8633208909702301\
    2023-11-16 00:00:00: 1.8633208909702301\
    Predictions for Bread (high grade flour) in 2025:\
    2023-11-15 00:00:00: 1.976067414932251\
    2023-11-16 00:00:00: 1.976067414932251"
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