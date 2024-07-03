import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

// export async function GET(request: NextRequest) {
// try {
//     const userID = await getDataFromToken(request);
//     const user = await User.findOne({_id: userID}).select("-password");
   
//         return NextResponse.json({
//         message: "User found",
//         data: user,
//     })

// } catch (error: any) {
//     return NextResponse.json({error: error.message},
//         {status:400})
// }
// }


export async function GET(request: NextRequest) {
try {
    const userID = await getDataFromToken(request);

    if(userID) {
        const user = await User.findOne({_id: userID}).select("-password");
   
        return NextResponse.json({
        message: "User found",
        data: user,
    })
    } else {
        return NextResponse.json({
        message: "User not found",           
        })
    }

} catch (error: any) {
        return NextResponse.json({error: error.message},
        {status:400})
}
}

