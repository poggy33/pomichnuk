"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "@/components/Spinner";
import LoginButtonGoogle from "@/components/LoginButtonGoogle";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    userName: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [isUsernameCorrect, setIsUsernameCorrect] = useState(false);
  const [isUniqueEmail, setIsUniqueEmail] = useState(true);
  const [isEmailExists, setIsEmailExists] = useState("")
  console.log(isEmailExists)

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      // console.log("Response success", response.data);
      router.push("/login");
    } catch (error: any) {
      setIsUniqueEmail(false);
      setIsEmailExists(user.email)
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 5 && isPasswordCorrect && isUsernameCorrect) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  function validateUsername(input: any) {
    if (input.length >= 2 && input.length <= 12) {
      return true;
    } else {
      return false;
    }
  }

  function validatePassword(input: any) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,8}$/.test(input);
  }

  function validateEmail(input: any) {
    setIsUniqueEmail(true)
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input);
  }

  return (
    <div className="flex flex-col items-center py-2">
      <div className="mt-10 mb-5">
        {loading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <h1 className="text-xl mt-10">Зачекайте будь ласка...</h1>
          </div>
        ) : (
          <div>
            <h1 className="text-xl">Реєстрація</h1>
          </div>
        )}
      </div>
      <hr></hr>
      {!loading && (
        <div className="flex flex-col items-center">
          <input
            className="w-80 h-12 mt-5 p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-600"
            id="username"
            // type="email"
            value={user.userName}
            onChange={(e) => {
              setIsUsernameCorrect(validateUsername(e.target.value));
              setUser({ ...user, userName: e.target.value });
            }}
            placeholder="Ім'я користувача"
          />
          {!isUsernameCorrect ? (
            <span className="text-xs text-red-700">2-12 символів.</span>
          ) : (
            <span className="text-xs text-green-800">
              Ім&apos;я користувача коректне.
            </span>
          )}

          <input
            className="w-80 h-12 p-2 border border-gray-300 rounded-lg mb-1 mt-4 focus:outline-none focus:border-gray-600"
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => {
              setIsEmailCorrect(validateEmail(e.target.value));
              setUser({ ...user, email: e.target.value });
              if(isEmailExists === e.target.value){setIsUniqueEmail(false)}
            }}
            placeholder="Електронна пошта"
          />
          {!isEmailCorrect  ? (
            <span className="text-xs text-red-700">
              Введіть коректну пошту.
            </span>
          ) : (
            <>
              {isUniqueEmail ? (
                <span className="text-xs text-green-800">Формат пошти коректний.</span>
              ) : (
                <span className="text-xs text-red-700">
                  Користувач з такою поштою вже існує.
                </span>
              )}
            </>
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
            placeholder="Пароль"
          />
          {!isPasswordCorrect ? (
            <span className="text-xs text-red-700">
              6-8 симолів латинські літери та цифри.
            </span>
          ) : (
            <span className="text-xs text-green-800">Пароль коректний.</span>
          )}

          <button
            disabled={buttonDisabled}
            onClick={onSignup}
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
          <LoginButtonGoogle />
          {/* {!isUniqueEmail && (
            <span className="text-md text-red-700 mt-10">
              Користувач з такою поштою вже існує.
            </span>
          )} */}
        </div>
      )}
    </div>
  );
}
