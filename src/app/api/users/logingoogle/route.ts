import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
const reqBody = await request.json();
const password = "Z123456"
const { userEmail } = reqBody;
const user = await User.findOne({email: userEmail});
console.log(user, userEmail)

if(user) {
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        });
        response.cookies.set("token", token, {httpOnly: true,});
        response.headers.set('Cache-Control', 'no-store');
        return response;
}
        // hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = new User({
            userName: userEmail,
            email: userEmail,
            password: hashedPassword,
            isVerified: true,
            verifiedBy: "google",
        });

        const savedUser = await newUser.save();
        // console.log(savedUser);

        //create token data
        const tokenData = {
            id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login successfull",
            success: true,
        });
        response.cookies.set("token", token, {httpOnly: true,});
        response.headers.set('Cache-Control', 'no-store');
        return response;


    } catch (error: any) {
                return NextResponse.json({error: error.message},
            {status:500})
    }
}