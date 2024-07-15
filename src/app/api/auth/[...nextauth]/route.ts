import NextAuth from "next-auth/next";
import GoogleProvider from  "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID! ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};