"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import LoginButtonGoogle from "@/components/LoginButtonGoogle";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      setIsCorrectPassword(false);
      router.push("/profile");
      router.refresh();
    } catch (error: any) {
      console.log("Login failed", error.message);
      setIsCorrectPassword(true);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 5 && user.password.length > 5) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center py-2">
      <div className="mt-10 mb-5">
        {loading ? (
          <div className="flex flex-col items-center">
            <Spinner />
            <h1 className="text-xl mt-10">Зачекайте будь ласка...</h1>
          </div>
        ) : (
          <h1 className="text-xl">Вхід</h1>
        )}
      </div>
      {!loading && (
        <div className="flex flex-col items-center">
          <hr></hr>
          <input
            className="w-80 h-12 p-2 border border-gray-300 rounded-lg mb-8 focus:outline-none focus:border-gray-600"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Електронна пошта"
          />
          <input
            className="p-2 w-80 h-12 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:border-gray-600"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Пароль"
          />
          {isCorrectPassword ? (
            <p className="text-xs text-red-700">
              Дані введені некоректно. Спробуйте ще раз.
            </p>
          ) : (
            <p className="text-xs"></p>
          )}

          <button
            disabled={buttonDisabled}
            onClick={onLogin}
            className={
              buttonDisabled
                ? "bg-slate-400 border-white w-40 mb-8 rounded-lg p-3 text-white mt-4"
                : "border-white w-40 mb-8 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
            }
          >
            Увійти
          </button>
          <Link className="text-lg text-slate-700 underline" href="/signup">
            Реєстрація
          </Link>
          <LoginButtonGoogle/>
        </div>
      )}
    </div>
  );
}
