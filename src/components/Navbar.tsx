"use client";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideMenuItem from "./SideMenu";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { RiUserForbidLine } from "react-icons/ri";

export default function Navbar() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("me");
  const [currentEmail, setCurrentEmail] = useState("");
  const [verifiedBy, setVerifiedBy] = useState("");
  // const { status } = useSession();

  const logout = async () => {
    try {
      console.log(verifiedBy);
      if (verifiedBy === "google") {
        signOut();
        await axios.get("/api/users/logout");
        toast.success("Logout google success");
        console.log("logout google success");
        setIsLoggedIn(false);
      } else {
        await axios.get("/api/users/logout");
        toast.success("Logout success");
        console.log("logout success");
        router.push("/login");
        setIsLoggedIn(false);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      // const parts = res.data.data.email.split("@");
      // if (parts.length > 1) {
      //   setCurrentUser(parts[0]);
      //   setVerifiedBy(res.data.data.verifiedBy);
      // }
      const user = res.data.data.userName;
      if (user) {
        setCurrentUser(user);
        setVerifiedBy(res.data.data.verifiedBy);
        setCurrentEmail(res.data.data.email)
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
      <div className="absolute top-20 left-4 mt-5 max-sm:mt-6">
        <SideMenuItem />
      </div>
      <div className="bg-gradient-to-t from-yellow-300 to-blue-400 flex h-16 justify-between items-center pl-4">
        <div>
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
      <div className="flex flex-col py-0.5 bg-gradient-to-b from-slate-100 to-gray-200 items-center">
        {!isLoggedIn && (
          <div className="flex">
            <p className="text-sm text-slate-400  mr-2">Увійдіть...</p>
            <RiUserForbidLine className="text-slate-500" />
          </div>
        )}
        {isLoggedIn && (
          <div className="flex">
            <p className="text-sm text-slate-400 mr-2">Вітаємо, <span>{currentUser}.</span></p>
            {/* <p className="text-sm text-slate-400">Ви увійшли як <span className="underline">{currentEmail}</span></p> */}
          </div>
        )}
      </div>        
      <div className="flex justify-center mt-4">
        <h1 className="py-2 px-4 rounded-full text-xl bg-gradient-to-r from-blue-300 via-green-300 to-blue-200 border-2 border-white">
          <span className="text-teal-100">Є</span>
          <span className="text-slate-600">Помічник</span>
        </h1>
      </div>
    </>
  );
}
