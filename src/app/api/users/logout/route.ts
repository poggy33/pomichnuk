//delete the authtoken 
import { NextResponse } from "next/server";


export async function GET() {
try {
    const response = NextResponse.json({
        message: "Logout successfull",
        success: true,
    });
    console.log(response)
    response.cookies.set("token", "", {httpOnly: false, expires: new Date(0)});
    return response;
} catch (error: any) {
    return NextResponse.json({error: error.message},
        {status:500})
}
}
