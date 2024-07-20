"use client";
import Select from "./Select";
import { SelectProps } from "./Select";
import React, { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { FcLikePlaceholder } from "react-icons/fc";
import SideMenuItem from "./SideMenu";
import Spinner from "./Spinner";

interface PostProps {
  city: string;
  category: string;
  service: string;
}

interface defProps {
  region: string | null;
  city: string | null;
  category: string | null;
  service: string | null;
}

export default function Main() {
  const router = useRouter();
  const [dataFromSelect, setDataFromSelect] = useState<SelectProps | null>(
    null
  );
  const [defDataFromSelect, setDefDataFromSelect] = useState<defProps | null>(
    null
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [posts, setPosts] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [likes, setLikes] = useState<any>();
  const [likesChanged, setLikesChanged] = useState(false);
  const [allPosts, setAllPosts] = useState<any>();
  const [lastTenPosts, setLastTenPosts] = useState<any>();
  const [likedPosts, setLikedPosts] = useState<any>();
  const [isShowedLikedPosts, setIsShowedLikedPosts] = useState(false);
  const [isShowedDefaultPosts, setIsShowedDefaultPosts] = useState(true);
  const [isShowedSearchedPosts, setIsShowedSearchedPosts] = useState(false);
  const [isDefaultData, setIsDefaultData] = useState(true);
  // const [showRate, setShowRate] = useState(false);
  // const [showRateId, setShowRateId] = useState("");

  const handleDataFromSelect = (data: SelectProps) => {
    setDataFromSelect(data);
  };
  useEffect(() => {
    setDefDataFromSelect({
      region: localStorage.getItem("region"),
      city: localStorage.getItem("city"),
      category: localStorage.getItem("category"),
      service: localStorage.getItem("serviceType"),
    });
  }, []);

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
      setUserEmail(res.data.data.email);
    }
  };

  //get likes
  const getLikes = async () => {
    if (userEmail) {
      const res = await axios.post("/api/users/getlikes", {
        whoIsChecked: userEmail,
      });
      if (res.data.message === "Likes found") {
        setLikes(res.data.data);
      }
    }
  };

  useEffect(() => {
    getLikes();
  }, [likesChanged, userEmail]);

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
      setLikesChanged(!likesChanged);
    }
  };

  const getPosts = async () => {
    try {
      setLoading(true);
      if (dataFromSelect) {
        const response = await axios.post(
          "/api/users/getposts",
          dataFromSelect
        );
        setPosts(response.data.data);
        setIsDefaultData(false);
      }
      if (isDefaultData) {
        if (defDataFromSelect) {
          if (
            defDataFromSelect.region !== null &&
            defDataFromSelect.city !== null &&
            defDataFromSelect.category !== null &&
            defDataFromSelect.service !== null
          ) {
            const response = await axios.post(
              "/api/users/getposts",
              defDataFromSelect
            );
            setPosts(response.data.data);
          }
        }
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

  useEffect(() => {
    if (defDataFromSelect) {
      if (
        defDataFromSelect.region !== null &&
        defDataFromSelect.city !== null &&
        defDataFromSelect.category !== null &&
        defDataFromSelect.service !== null
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [defDataFromSelect]);

  const getAllPosts = async () => {
    const res = await axios.get("/api/users/getallposts");
    if (res.data.message === "Posts found") {
      setAllPosts(res.data.data);
      const tenPosts = res.data.data.reverse().slice(0, 10);
      setLastTenPosts(tenPosts);
    }
  };

  const getLikedPosts = () => {
    if (likes) {
      let arrLiked: any = [];
      likes.forEach((like: any) => {
        let liked = allPosts.find(
          (post: any) => like.whatIsCheckedId === post._id
        );
        arrLiked.push(liked);
      });
      setLikedPosts(arrLiked);
    }
  };

  useEffect(() => {
    getAllPosts();
    getUserDetails();
    getLikedPosts();
  }, []);

  useEffect(() => {
    getPosts();
    getLikes();
    setIsShowedDefaultPosts(false);
    setIsShowedLikedPosts(false);
    setIsShowedSearchedPosts(true);
  }, [dataFromSelect]);

  // const getRate = (id: string) => {
  //   if (userEmail) {
  //     console.log(id);
  //     setShowRate(!showRate);
  //     console.log(showRate);
  //     setShowRateId(id);
  //   }
  // };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="">
        <Select onData={handleDataFromSelect} />
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          disabled={buttonDisabled}
          onClick={() => {
            // getPosts();
            // getLikes();
            setIsShowedDefaultPosts(false);
            setIsShowedLikedPosts(false);
            setIsShowedSearchedPosts(true);
          }}
          className={
            buttonDisabled
              ? "border-2 hover:border-white bg-slate-400  w-52 mb-4 rounded-lg p-3 text-white mt-4"
              : "border-2 hover:border-white w-52 mb-4 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
          }
        >
          Пошук
        </button>
        <button
          onClick={() => {
            getLikes();
            getLikedPosts();
            setIsShowedDefaultPosts(false);
            setIsShowedLikedPosts(true);
            setIsShowedSearchedPosts(false);
          }}
          className="w-52 mb-6 rounded-lg p-3 text-white bg-gradient-to-r from-yellow-400 to-blue-500 hover:to-blue-700 border-2 hover:border-white"
        >
          <p className="flex justify-between">
            <span>Показати обрані</span>
            <span className="pt-0.5 text-lg">
              <FcLike className="opacity-70" />
            </span>
          </p>
        </button>
        <div className="flex flex-col justify-center items-center">
          {isShowedLikedPosts && !userEmail && (
            <div>
              <h1 className="text-lg text-gray-600">
                Увійдіть, щоб побачити обрані...
              </h1>
            </div>
          )}
          {loading && <Spinner/>}

          {posts && isShowedSearchedPosts && (
            <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
              {posts.map((item: any) => {
                return (
                  <div
                    // onClick={() => {
                    //   getRate(item._id);
                    // }}
                    key={item._id}
                    className=" border-2 hover:border-white rounded-md"
                  >
                    <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                      <div className="flex justify-between mb-1">
                        <p className="text-gray-700">{item.city}</p>
                        <div
                          onClick={() => createOrUpdateLike(item._id)}
                          className="mt-1"
                        >
                          {likes && (
                            <div>
                              {likes.map((like: any) => {
                                const isLike =
                                  like.whatIsCheckedId === item._id &&
                                  like.isChecked;
                                return (
                                  <div key={like._id}>
                                    {isLike && (
                                      <FcLike className="absolute text-lg" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <FcLikePlaceholder className="text-lg" />
                        </div>
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <span>
                          <span className="text-xs text-gray-700">
                            {item.userId}
                          </span>

                          <span className="ml-2"></span>
                        </span>
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

          {allPosts && isShowedDefaultPosts && (
            <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
              {lastTenPosts.map((item: any) => {
                return (
                  <div
                    key={item._id}
                    className="border-2 hover:border-white rounded-md"
                  >
                    <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                      <div className="flex justify-between mb-1">
                        <p className="text-gray-700">{item.city}</p>
                        <div
                          onClick={() => createOrUpdateLike(item._id)}
                          className="mt-1"
                        >
                          {likes && (
                            <div>
                              {likes.map((like: any) => {
                                const isLike =
                                  like.whatIsCheckedId === item._id &&
                                  like.isChecked;
                                return (
                                  <div key={like._id}>
                                    {isLike && (
                                      <FcLike className="absolute text-lg" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <FcLikePlaceholder className="text-lg" />
                        </div>
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <span className="text-xs text-gray-700">
                          {item.userId}
                        </span>
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

          {likedPosts && isShowedLikedPosts && (
            <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
              {likedPosts.map((item: any) => {
                return (
                  <div
                    key={item._id}
                    className=" border-2 hover:border-white rounded-md"
                  >
                    <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                      <div className="flex justify-between mb-1">
                        <p className="text-gray-700">{item.city}</p>
                        <div
                          onClick={() => createOrUpdateLike(item._id)}
                          className="mt-1"
                        >
                          {likes && (
                            <div>
                              {likes.map((like: any) => {
                                const isLike =
                                  like.whatIsCheckedId === item._id &&
                                  like.isChecked;
                                return (
                                  <div key={like._id}>
                                    {isLike && (
                                      <FcLike className="absolute text-lg" />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <FcLikePlaceholder className="text-lg" />
                        </div>
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <span className="text-xs text-gray-700">
                          {item.userId}
                        </span>
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
        </div>
      </div>
    </div>
  );
}
