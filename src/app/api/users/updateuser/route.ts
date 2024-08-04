import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {email, countPosts} = reqBody;
    
        const res = await User.findOneAndUpdate({email: email}, {countPosts: countPosts})
    
        return NextResponse.json({
        message: "User countPost found",
        data: res,
    })
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};