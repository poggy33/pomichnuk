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
            if(account.provider === "google" && user.email.length > 0) {
                const { email } = user;
            try {
                // await axios.post(`${process.env.DOMAIN}/api/users/logingoogle`, {userEmail: email})
                // return user;

                const res = await fetch(`${process.env.DOMAIN}/api/users/logingoogle`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email,
                    })
            })
            if (res.ok) {
                return user;
              }
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