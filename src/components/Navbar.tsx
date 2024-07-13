"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideMenuItem from "./SideMenu";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("me");

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout success");
      console.log("logout success");
      router.push("/login");
      setIsLoggedIn(false);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      const parts = res.data.data.email.split("@");
      if (parts.length > 1) {
        setCurrentUser(parts[0]);
      }
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    getUserDetails();
  }, [logout]);

  const redirectProfile = () => {
    router.push("/profile");
    router.refresh();
  };

  return (
    <>
      <div className="absolute top-20 left-4 mt-4 max-sm:mt-5">
        <SideMenuItem />
      </div>
      <div className="bg-gradient-to-t from-yellow-300 to-blue-400 flex h-20 justify-between items-center pl-4">
        <div>
        {isLoggedIn && (
              <span className="absolute mt-8 ml-1 px-1 text-white text-xs">
                {currentUser}
              </span>
            )}
          <Link href={"/"}>
            <span className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border-2 hover:border-white h-8 max-sm:text-xs rounded-lg px-2 py-2">
              Головна
            </span>
          </Link>
        </div>
        <div className="flex pr-4">
          <button onClick={redirectProfile}>
            <span className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border-2 hover:border-white h-8 max-sm:text-xs rounded-lg px-2 py-2">
              Надати послугу
            </span>
          </button>

          {isLoggedIn ? (
            <button className="" onClick={logout}>
              <span className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border-2 hover:border-white h-8 max-sm:text-xs rounded-lg px-2 py-2 ml-4">
                Вийти
              </span>
            </button>
          ) : (
            <button className="" onClick={() => router.push("/login")}>
              <span className="bg-gradient-to-t from-yellow-300 to-blue-400 hover:to-blue-500 border-2 hover:border-white h-8 max-sm:text-xs rounded-lg px-2 py-2 ml-4">
                Увійти
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <h1 className="py-2 px-4 rounded-full text-xl bg-gradient-to-r from-blue-300 via-green-300 to-blue-200 border-2 border-white">
          ЄПомічник
        </h1>
      </div>
    </>
  );
}
