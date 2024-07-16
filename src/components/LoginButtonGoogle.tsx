"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";

function LoginButtonGoogle() {
  const { status, data: session } = useSession();
  const [userEmail, setUserEmail] = useState<undefined | string>()
  const router = useRouter()

  useEffect(()=>{
    if (status && session?.user?.email) {
        if(status === "authenticated" && session.user.email.length >0){
            setUserEmail(session?.user?.email)
            onGoogleSignup(session?.user?.email)
        }
      }

  }, [status, userEmail])

  const onGoogleSignup = async (latestUserEmail:any) => {
    try {
        console.log(status, userEmail)
      await axios.post("/api/users/logingoogle", {userEmail: latestUserEmail, status: status});
      router.push("/");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col mt-20">
      <p className="text-md mb-1">Увійти за допомогою Google</p>
      <div className="flex justify-center">
        <div
          onClick={() => signIn("google")}
          className="flex justify-between w-40 items-center p-2 pr-4 bg-slate-400 border-2 hover:border-white hover:cursor-pointer rounded-lg text-white"
        >
          <FcGoogle className="text-3xl" />
          <button>Вхід Google</button>
        </div>
      </div>
    </div>
  );
}

export default LoginButtonGoogle;
