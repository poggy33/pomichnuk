import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Rate from "@/models/rateModel";

connect();

export async function POST(request: NextRequest) {
try {
    const reqBody = await request.json();
    const {postId} = reqBody;   
    console.log(postId)

        const rate = await Rate.deleteMany({whatIsCheckedId: postId})

        return NextResponse.json({
        message: "Rates deleted",
        data: rate,
    })
    
    }
 catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
    }
};

