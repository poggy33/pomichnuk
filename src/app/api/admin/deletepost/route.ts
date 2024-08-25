import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import Rate from "@/models/rateModel";
import Like from "@/models/likeModel";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {postId, email} = reqBody;   
        console.log(postId)
            
            await Rate.deleteMany({whoIsChecked: email})
            await Like.deleteMany({whatIsCheckedId: postId,})
            await Post.findOneAndDelete({_id: postId,})

            const user = await User.findOne({email: email});
            if(user) {
                const countDeletedPosts = Number(user.countDeletedPostsByAdmin);
                if(countDeletedPosts >= 2) {
                    await User.findOneAndUpdate({email: email}, {isUserBlocked: true})
                    await Like.deleteMany({whoIsChecked: email,})
                } else {
                    await User.findOneAndUpdate({email: email}, {countDeletedPostsByAdmin: (countDeletedPosts + 1).toString()})
                }
            }

            return NextResponse.json({
            message: "Post deleted",
        })
        }
     catch (error: any) {
            return NextResponse.json({error: error.message},
            {status:400})
        }
    };