import { NextRequest, NextResponse } from "next/server";

function getModelData(country: string,year: string,month: string){
    return {'Bread':2.3,'Rice':1.5,'Strawberries':2.5,'Milk':1.8,'cereal':2.3}
}

export async function GET() {
    try {
        let data = await getModelData("","","");
       
        return NextResponse.json({'modelResponse': data}, { status: 200 });
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}