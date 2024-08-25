"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "@/components/Spinner";
import { FiMapPin } from "react-icons/fi";

function AdminPage() {
  const [userEmail, setUserEmail] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [myPosts, setMyPosts] = useState<any>();
  const [allPosts, setAllPosts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  //get users details
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      setUserEmail(res.data.data.email);
      //   setCountUsersPosts(Number(res.data.data.countPosts));
      if (res.data.data.isAdmin) {
        setIsAdmin(res.data.data.isAdmin);
      }
    }
  };

  //get allPosts
  const getAllPosts = async () => {
    try {
      if (userEmail) {
        setLoading(true);
        const response = await axios.post("/api/admin/getallposts", {userEmail: userEmail});
        console.log(response.data.data);
        setAllPosts(response.data.data.reverse().slice(0, 200));
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const delPost = async (postDetails: any) => {
    try {
      const { id, email } = postDetails;
      if (id && email) {
        await axios.post("/api/users/delpost", {
          postId: id,
        });
      };
      setIsDelete(!isDelete);
    } catch (error: any) {
      console.log("Delete post by admin failed", error.message);
      toast.error(error.message);
    } 
  };


  const deletePost = async (postDetails: any) => {
    try {
      const { id, email } = postDetails;
      if (id && email) {
        await axios.post("/api/admin/deletepost", {
          postId: id,
          email: email,
        });
      }
    } catch (error: any) {
      console.log("Delete post by admin failed", error.message);
      toast.error(error.message);
    } finally {
      setIsDelete(!isDelete);
    }
  };

  //   const deletePost = async (postId: any) => {
  //     try {
  //       if (postId && userEmail) {
  //         await axios.post("/api/users/delpost", {
  //           postId: postId,
  //         });
  //       }
  //     } catch (error: any) {
  //       console.log("Delete post failed", error.message);
  //       toast.error(error.message);
  //     } finally {
  //       setIsDelete(!isDelete);
  //     }
  //   };

  //   const updateUserCountPosts = async () => {
  //     try {
  //       if (userEmail) {
  //         await axios.post("/api/users/updateuser", {
  //           email: userEmail,
  //           countPosts: (countUserPosts - 1).toString(),
  //         });
  //       }
  //     } catch (error: any) {
  //       console.log("Update user countPosts failed", error.message);
  //       toast.error(error.message);
  //     }
  //   };

  //   const deleteLike = async (postId: any) => {
  //     try {
  //       if (postId && userEmail) {
  //         await axios.post("/api/users/deletelike", {
  //           postId: postId,
  //         });
  //       }
  //     } catch (error: any) {
  //       console.log("Delete like failed", error.message);
  //       toast.error(error.message);
  //     }
  //   };

  //   const deleteRate = async (postId: any) => {
  //     try {
  //       if (postId && userEmail) {
  //         await axios.post("/api/users/deleterate", {
  //           postId: postId,
  //         });
  //       }
  //     } catch (error: any) {
  //       console.log("Delete rate failed", error.message);
  //       toast.error(error.message);
  //     }
  //   };

  useEffect(() => {
    getUserDetails();
  }, []);

  useEffect(() => {
    getAllPosts();
  }, [userEmail, isDelete]);

  return (
    <div>
      {userEmail && isAdmin && (
        <div className="mt-6 flex flex-col items-center">
          <div className="flex animate-pulse">
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
                <h1 className="text-lg text-slate-600">
                  Зачекайте будь ласка...
                </h1>
              </div>
            )}

            {allPosts && (
              <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
                {allPosts.map((item: any) => {
                  return (
                    <div
                      key={item._id}
                      className=" border-2 hover:border-white rounded-md"
                    >
                      <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                        <div className="flex justify-between mb-1 items-center">
                          <p className="text-gray-700">{item.userName}</p>
                          <div
                            onClick={() => {
                            //   deletePost({ id: item._id, email: item.userId });
                              delPost({id: item._id, email: item.userId});
                            }}
                            className="mt-1"
                          >
                            <MdDeleteOutline className="text-xl" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-gray-800">
                          <div className="flex">
                            <FiMapPin className="mr-1 pt-0.5" />
                            <p className="text-gray-700 text-xs">{item.city}</p>
                          </div>
                          {/* <span className="text-xs text-gray-700">{item.city}</span> */}
                          <span className="text-xs">
                            {item.date.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 mb-6 text-sm  px-3">{item.text}</div>
                    </div>
                  );
                })}
              </div>
            )}
            {myPosts && myPosts.length === 0 && !loading && (
              <p>У Вас немає активних оголошень.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;
