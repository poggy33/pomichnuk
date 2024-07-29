import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import Post from "@/models/postModel";
import Rate from "@/models/rateModel";
import { connect } from "@/dbConfig/dbConfig";

connect();


export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {choosenEmail, userEmail, ratingValue, postId} = reqBody;
    console.log(choosenEmail, userEmail, ratingValue, postId)

    if(choosenEmail && userEmail && ratingValue) {
        const user = await User.findOne({email : choosenEmail});
        const myRates = await Rate.find({whoIsChecked: userEmail})
        const rate = await Rate.findOne({whoIsChecked : userEmail, whatIsCheckedEmail: choosenEmail});
        const post = await Post.findOne({_id : postId});
        // console.log(myRates)
        if(!rate) {
            const newRate = new Rate({
                whoIsChecked : userEmail,
                whatIsCheckedEmail: choosenEmail,
                rate: ratingValue,
                whatIsCheckedId: postId,
            
            });     
            const savedRate = await newRate.save();
      
           if(post && user) {
            const postRate = (Number(post.rate) + Number(ratingValue))/(Number(post.countRate) + 1)
            const userRate = (Number(user.rate) + Number(ratingValue))/(Number(user.countRate) + 1)   
            const postRateCount = (Number(post.countRate) + 1)
            const userRateCount = (Number(user.countRate) + 1)
 
            await Post.findOneAndUpdate({_id: postId}, {rate: postRate, countRate: postRateCount})
            await User.findOneAndUpdate({email : choosenEmail}, {rate: userRate, countRate: userRateCount})
        }
        }

        return NextResponse.json({
        message: "Rate created",
        data: rate,
    })
    } else {
        return NextResponse.json({
        message: "Rate exists",           
        })
    }

} catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
}
}