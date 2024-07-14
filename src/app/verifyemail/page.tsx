"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      console.log(token+"verifyUserEmail")
      await axios.post("/api/users/verifyemail", { token: token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      // console.log(error.response.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken+"useEffect")
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center mt-6 text-slate-700 px-10">
      {verified && (
        <div>
          <h1 className="text-center">Вітаємо! Верифікація пройдена успішно.</h1>
        </div>
      )}
      {error && (
        <div>
          <h1 className="text-center">Верифікація не пройдена. Повторіть будь-ласка спробу.</h1>
        </div>
      )}
    </div>
  );
}
