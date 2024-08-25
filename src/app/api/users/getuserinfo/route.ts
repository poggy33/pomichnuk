import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {email} = reqBody;

    if(email) {
        const user = await User.findOne({email: email});
   
        return NextResponse.json({
        message: "User found",
        data: user,
    })
    } else {
        return NextResponse.json({
        message: "User not found",           
        })
    }

} catch (error: any) {
        return NextResponse.json({error: error.message},
        {status: 400})
}
}

