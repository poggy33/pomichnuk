import NextAuth from "next-auth/next";
import GoogleProvider from  "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGL_CLIENT_ID as string,
            clientSecret: process.env.GOOGL_CLIENT_SECRET as string,
        }),
    ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};