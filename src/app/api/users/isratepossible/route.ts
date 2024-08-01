import { NextRequest, NextResponse } from "next/server";
import Rate from "@/models/rateModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {choosenEmail, userEmail} = reqBody;

    const rate = await Rate.findOne({whoIsChecked : userEmail, whatIsCheckedEmail: choosenEmail});
    if(!rate) {
        return NextResponse.json({
        message: "Rate possible",
        data: rate,
    })
    } else {
        return NextResponse.json({
        message: "Rate impossible",           
        })
    }

} catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
}
}