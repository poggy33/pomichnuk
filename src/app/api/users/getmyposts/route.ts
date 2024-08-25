import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {userId} = reqBody;

        const myPosts = await Post.find({userId: userId,})
        const reversedPosts = myPosts.reverse()
        return NextResponse.json({
        message: "Post found",
        data: reversedPosts,
    })
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};