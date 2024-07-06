"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      router.push("/");
      setIsLoggedIn(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    getUserDetails();
    // router.refresh()
  },[logout]);
    

  const redirectProfile = () => {
    router.push("/profile");
    router.refresh();
  };

  return (
    <div className="bg-gradient-to-t from-yellow-300 to-blue-400 flex h-16 justify-between items-center pl-4">
      <div>
        <Link className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border h-8 max-sm:text-xs rounded-lg p-2" href={"/"}>
          Помічник
        </Link>
      </div>
      <div className="flex pr-4">
        <button
          onClick={redirectProfile}
          className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border max-sm:text-xs rounded-lg px-2 py-1"
        >
          Надати послугу
        </button>

        {isLoggedIn ? (
          <button
            onClick={logout}
            className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 h-8 max-sm:text-xs ml-4 w-20 border rounded-lg px-2 py-1"
          >
            Вийти
          </button>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border h-8 max-sm:text-xs ml-4 w-20 rounded-lg px-2 py-1"
          >
            Вхід
          </button>
        )}
      </div>
    </div>
  );
}
