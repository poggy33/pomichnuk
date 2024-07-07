import { NextRequest, NextResponse } from "next/server";
import Like from "@/models/likeModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const { whoIsChecked, whatIsCheckedId, isChecked} = reqBody;
        const likedPost = await Like.findOne({whoIsChecked: whoIsChecked, whatIsCheckedId: whatIsCheckedId})
        console.log(likedPost);

        if(likedPost) {

        if(likedPost.isChecked === true) {
            await Like.findOneAndUpdate({whoIsChecked: whoIsChecked, whatIsCheckedId: whatIsCheckedId}, {isChecked:false})
        console.log("updated")
        } else {
            await Like.findOneAndUpdate({whoIsChecked: whoIsChecked, whatIsCheckedId: whatIsCheckedId}, {isChecked:true}) 
        }
        const updatedLike = await Like.findOne({whoIsChecked: whoIsChecked, whatIsCheckedId: whatIsCheckedId})
        return NextResponse.json({
        message: "LikedPost updated",
        data: updatedLike,
        })
        } else {
            const newLike = new Like({
                whoIsChecked, 
                whatIsCheckedId, 
                isChecked,
            });     
            const savedLike = await newLike.save();
            console.log(savedLike);
            const createdLike = await Like.findOne({whoIsChecked: whoIsChecked, whatIsCheckedId: whatIsCheckedId})
        
            return NextResponse.json({
                message: "Like created successfully",
                success: true,
                data: createdLike,
            })
        } 
    }
catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};