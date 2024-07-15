"use client"
import React from "react";
import {SessionProvider} from "next-auth/react";

interface Props {
    children?: React.ReactNode;
  }

export default function NextAuthProvider  ({children}:Props,)  {
    // const session = useSession()
    return <SessionProvider>{children}</SessionProvider>

}





