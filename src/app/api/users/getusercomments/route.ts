import { NextRequest, NextResponse } from "next/server";
import Rate from "@/models/rateModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {email} = reqBody;

    if(email) {
        const comments = await Rate.find({whatIsCheckedEmail: email});
        console.log(comments)
   
        return NextResponse.json({
        message: "Comments found",
        data: comments,
    })
    } else {
        return NextResponse.json({
        message: "Comments not found",           
        })
    }

} catch (error: any) {
        return NextResponse.json({error: error.message},
        {status: 400})
}
}