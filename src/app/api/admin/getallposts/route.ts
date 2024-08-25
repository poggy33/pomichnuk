import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
        const posts = await Post.find()
        console.log(posts)
        return NextResponse.json({
        message: "Posts found",
        data: posts,
    })
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};