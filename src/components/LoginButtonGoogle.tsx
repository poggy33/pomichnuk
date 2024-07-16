"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

function LoginButtonGoogle() {
    const {status, data: session} = useSession();
    console.log(status);
    console.log(session?.user?.email);

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
