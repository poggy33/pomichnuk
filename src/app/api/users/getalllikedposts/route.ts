import { NextRequest, NextResponse } from "next/server";
import Like from "@/models/likeModel";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const { whoIsChecked } = reqBody;
    const likes = await Like.find({whoIsChecked: whoIsChecked});
    const posts = await Post.find();
    
            return NextResponse.json({
            message: "Liked posts found",
            data: {likes: likes, posts: posts},
            })
        
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};