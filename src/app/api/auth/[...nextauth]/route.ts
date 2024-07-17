import NextAuth from "next-auth/next";
import GoogleProvider from  "next-auth/providers/google";
import axios from "axios";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID! ,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {

        async signIn({ user, account }: {user: any; account: any;}) {
            if(account.provider === "google") {
                const { email } = user;
            try {
                await axios.post("/api/users/logingoogle", {userEmail: email})
                return user;
            } catch (error) {
                console.error("Error in sign-in callback:", error);
                return false;
            }
            }

        }

    }
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};