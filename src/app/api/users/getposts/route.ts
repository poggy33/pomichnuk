import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {city, category, region, service} = reqBody;
        const posts = await Post.find({city: city, region: region, category: category, service: service})
        const reversedPosts = posts.reverse();
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