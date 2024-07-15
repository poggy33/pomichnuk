import NextAuth from "next-auth/next";
import GoogleProvider from  "next-auth/providers/google";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: "547014806403-pv58jpmf0j5sm91gcedbom8s1gja08dn.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};