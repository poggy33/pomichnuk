import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";
import Rate from "@/models/rateModel"

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {postId} = reqBody;   
    console.log(postId)
    const updatedPosts = await Post.find()
    //     const updatedPosts = await Post.findOneAndDelete({_id: postId,})
    //     await Rate.deleteMany({whatIsCheckedId: postId})
    //     console.log(postId)

        return NextResponse.json({
        message: "Post deleted",
        data: updatedPosts,
    })
    
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};


