"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "@/components/Spinner";

function UserPosts() {
  const [userEmail, setUserEmail] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [myPosts, setMyPosts] = useState<any>();
  const [loading, setLoading] = useState(false);

  //get users details
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      setUserEmail(res.data.data.email);
    }
  };

  //get myPosts
  const getMyPosts = async () => {
    try {
      if (userEmail) {
        setLoading(true);
        const response = await axios.post("/api/users/getmyposts", {
          userId: userEmail,
        });
        console.log(response.data.data);
        setMyPosts(response.data.data);
      }
    } catch (error: any) {
      console.log("myPosts failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (postId: any) => {
    try {
      if (postId && userEmail) {
        const responseUpdateOrCreate = await axios.post(
          "/api/users/deletePost",
          {
            _id: postId,
          }
        );
      }
    } catch (error: any) {
      console.log("Delete post failed", error.message);
      toast.error(error.message);
    } finally {
      setIsDelete(!isDelete);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    getMyPosts();
  }, [userEmail, isDelete]);

  return (
    <div className="mt-6 flex flex-col items-center">
      <div className="flex">
        <FaArrowLeft className="relative mr-3 mt-1" />
        <Link className="" href="/">
          Назад
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        {loading && (
          <div className="flex flex-col items-center">
            <div className="mb-2">
              <Spinner />
            </div>
            <h1 className="text-lg text-slate-600">Зачекайте...</h1>
          </div>
        )}

        {myPosts && (
          <div className="flex flex-col max-sm:w-80 sm:max-w-lg lg:max-w-3xl">
            {myPosts.map((item: any) => {
              return (
                <div
                  key={item._id}
                  className=" border-2 hover:border-white rounded-md"
                >
                  <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                    <div className="flex justify-between mb-1">
                      <p className="text-gray-700">{item.city}</p>
                      <div
                        onClick={() => deletePost(item._id)}
                        className="mt-1"
                      >
                        <MdDeleteOutline className="text-xl" />
                      </div>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span>
                        <span className="text-xs text-gray-700">
                          {item.userId}
                        </span>

                        <span className="ml-2"></span>
                      </span>
                      <span className="text-xs">{item.date.slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="mt-2 mb-6 text-sm  px-3">{item.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPosts;
