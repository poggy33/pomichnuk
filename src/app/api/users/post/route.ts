import { connect } from "@/dbConfig/dbConfig";
import Post from "@/models/postModel";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";

connect();

export async function POST(request:NextRequest) {
    try {
const reqBody = await request.json();
const {region, city, category, service, text, userId} = reqBody;
console.log(reqBody);

    // create new post
    const newPost = new Post({
        region,
        city,
        category,
        service,
        text,
        userId,
    });

    const savedPost = await newPost.save();
    console.log(savedPost);

    return NextResponse.json({
        message: "Post created successfully",
        success: true,
        savedPost
    })

    } catch (error: any) {
            return NextResponse.json({error: error.message},
        {status:500})
    }
}