import { NextRequest, NextResponse } from "next/server";
import Like from "@/models/likeModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {postId} = reqBody;   
        const updatedLikes = await Like.findOneAndDelete({whatIsCheckedId: postId,})
        return NextResponse.json({
        message: "Like deleted",
        data: updatedLikes,
    })
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};