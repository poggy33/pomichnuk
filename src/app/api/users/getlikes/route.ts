import { NextRequest, NextResponse } from "next/server";
import Like from "@/models/likeModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const { whoIsChecked } = reqBody;
    console.log(reqBody)
    const likes = await Like.find({whoIsChecked: whoIsChecked})
    console.log(likes);
        return NextResponse.json({
        message: "Likes found",
        data: likes,
    })
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};