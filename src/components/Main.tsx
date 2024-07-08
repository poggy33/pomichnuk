"use client";
import Select from "./Select";
import { SelectProps } from "./Select";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { FiHeart } from "react-icons/fi";
import { FcLikePlaceholder } from "react-icons/fc";

interface PostProps {
  city: string;
  category: string;
  service: string;
}

export default function Main() {
  const router = useRouter();
  const [dataFromSelect, setDataFromSelect] = useState<SelectProps | null>(
    null
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [posts, setPosts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [likes, setLikes] = useState<any>();
  const [likesChanged, setLikesChanged] = useState(false);

  const handleDataFromSelect = (data: SelectProps) => {
    setDataFromSelect(data);
  };

  useEffect(() => {
    if (dataFromSelect) {
      handleDataFromSelect(dataFromSelect);
    }
  }, [dataFromSelect]);
  // console.log(posts);

  //get users details
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      console.log(res.data.data);
      setUserEmail(res.data.data.email);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  console.log(userEmail);

  //get likes
  const getLikes = async () => {
    console.log(userEmail);
    if (userEmail) {
      const res = await axios.post("/api/users/getlikes", {
        whoIsChecked: userEmail,
      });

      if (res.data.message === "Likes found") {
        console.log(res.data.data);
        setLikes(res.data.data);
      }
    }
  };

  // useEffect(() => {
  //   getLikes();
  // }, [likesChanged]);
  // console.log(likes);
  useEffect(() => {
    getLikes();
  }, [likesChanged]);

  const createOrUpdateLike = async (postId: any) => {
    try {
      if (postId && userEmail) {
        const responseUpdateOrCreate = await axios.post(
          "/api/users/updatelikedpost",
          {
            whoIsChecked: userEmail,
            whatIsCheckedId: postId,
            isChecked: true,
          }
        );
        console.log("Update or create success");
      }
    } catch (error: any) {
      console.log("Like failed", error.message);
      toast.error(error.message);
    } finally {
      // setLoading(false);
      setLikesChanged(!likesChanged);
    }
  };

  const postData = async () => {
    try {
      setLoading(true);
      if (dataFromSelect) {
        const response = await axios.post(
          "/api/users/getposts",
          dataFromSelect
        );

        console.log(response.data.data);
        setPosts(response.data.data);
        console.log("Post success");
      }
    } catch (error: any) {
      console.log("Post failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (dataFromSelect) {
      if (
        dataFromSelect.region.length > 0 &&
        dataFromSelect.city.length > 0 &&
        dataFromSelect.category.length > 0 &&
        dataFromSelect.service.length > 0
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [dataFromSelect]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="">
        <Select onData={handleDataFromSelect} />
      </div>

      <div className="flex flex-col justify-center items-center">
        <button
          disabled={buttonDisabled}
          onClick={() => {
            postData();
            getLikes();
          }}
          className={
            buttonDisabled
              ? "bg-slate-400 border-white w-40 mb-8 rounded-lg p-3 text-white mt-4"
              : "border-white w-40 mb-8 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
          }
        >
          Пошук
        </button>
        {posts && (
          <div>
            {posts.map((item: any) => {
              return (
                <div
                  key={item._id}
                  className="max-sm:w-80 border-2 hover:border-white rounded-md"
                >
                  <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                    <div className="flex justify-between mb-1">
                      <p className="text-gray-700">{item.city}</p>
                      <div
                        onClick={() => createOrUpdateLike(item._id)}
                        className="mt-1"
                      >
                        {/* {likes && (
                          <div>
                            {likes.map((like: any) => {
                              return (
                                <div key={like._id}>
                                  {like.whatIsCheckedId === item._id ? (
                                    <div>
                                      {like.isChecked ? (
                                        <FcLike />
                                      ) : (
                                        <FiHeart />
                                      )}
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}{!userEmail && <FiHeart />} */}

                        {likes && (
                          <div>
                            {likes.map((like: any) => {
                              const isLike =
                                like.whatIsCheckedId === item._id &&
                                like.isChecked;

                              return (
                                <div key={like._id}>
                                  {isLike && <FcLike className="absolute text-lg " />}
                                  {/* <FcLike className={count && "hidden"} />
                                  <FiHeart className={ "flex"} /> */}
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {/* {!userEmail && <FiHeart />} */}
                        {/* {likes.length === 0 && <FiHeart />} */}
                        <FcLikePlaceholder className="text-lg" />
                      </div>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span className="text-xs text-gray-700">
                        {item.userId}
                      </span>
                      <span className="text-xs">{item._id}</span>
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
