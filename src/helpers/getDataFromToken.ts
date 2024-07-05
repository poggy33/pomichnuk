import type { NextRequest } from 'next/server';
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
// console.log(token)
        if(token) {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;  
        } else {
            return token;
        }

    } catch (error: any) {
        throw new Error(error.message)
    }
    }