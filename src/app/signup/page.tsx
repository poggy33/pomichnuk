"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Response success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 5 && isPasswordCorrect) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  function validatePassword(input: any) {
    return /^[a-zA-Z0-9]{6,8}$/.test(input);
  }

  function validateEmail(input: any) {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
  }

  return (
    <div className="flex flex-col bg-indigo-100 items-center min-h-screen py-2">
      <div className="mt-10 mb-5">
        {loading ? <Spinner /> : <h1 className="text-xl">Реєстрація</h1>}
      </div>
      <hr></hr>
      <input
        className="w-80 h-12 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => {
          setIsEmailCorrect(validateEmail(e.target.value));
          setUser({ ...user, email: e.target.value });
        }}
        placeholder="email"
      />
      {!isEmailCorrect ? (
        <span className="text-xs text-red-700">Введіть коректну пошту</span>
      ) : (
        <span className="text-xs text-green-800">Пошта коректна</span>
      )}

      <input
        className="w-80 h-12 p-2 border border-gray-300 rounded-lg mb-1 mt-5 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
          setIsPasswordCorrect(validatePassword(e.target.value));
        }}
        placeholder="password"
      />
      {!isPasswordCorrect ? (
        <span className="text-xs text-red-700">
          6-8 симолів латинські літери та цифри
        </span>
      ) : (
        <span className="text-xs text-green-800">Пароль коректний</span>
      )}

      <button
        disabled={buttonDisabled}
        onClick={onSignup}
        // className="border-white w-40 mb-8 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
        className={
          buttonDisabled
            ? "bg-slate-400 border-white w-40 mb-8 rounded-lg p-3 text-white mt-4"
            : "border-white w-40 mb-8 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
        }
      >
        Зареєструватися
      </button>
      <Link className="text-lg text-slate-700 underline" href="/login">
        Увійти
      </Link>
    </div>
  );
}
