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
import { IoClose } from "react-icons/io5";
import Spinner from "./Spinner";
import { Rating } from "react-simple-star-rating";
import { FaRegStar } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { encrypt } from "@/helpers/crypto";
interface DefProps {
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
  const [defDataFromSelect, setDefDataFromSelect] = useState<DefProps | null>(
    null
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [posts, setPosts] = useState<any>();
  const [countPosts, setCountPosts] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [likes, setLikes] = useState<any>([]);
  const [likesChanged, setLikesChanged] = useState(false);
  // const [allPosts, setAllPosts] = useState<any>();
  // const [likedPosts, setLikedPosts] = useState<any>();
  const [isShowedLikedPosts, setIsShowedLikedPosts] = useState(false);
  const [isShowedSearchedPosts, setIsShowedSearchedPosts] = useState(false);
  const [isDefaultData, setIsDefaultData] = useState(true);
  const [showRateId, setShowRateId] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [text, setText] = useState("");
  const simpleKey = "qwedsfrd";
  const [tenPosts, setTenPosts] = useState<any>();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [defPageNumber, setDefPageNumber] = useState<any>();
  const [isRateSubmitted, setIsRateSubmitted] = useState(false);
  const [isAllPostsFound, setIsAllPostsFound] = useState(false);
  const [allLikedPosts, setAllLikedPosts] = useState<any>();

  //new liked posts
  const getAllLikedPosts = async () => {
    if (userEmail) {
      const res = await axios.post("/api/users/getalllikedposts", {
        whoIsChecked: userEmail,
      });
      if (res.data.message === "Liked posts found") {
        const newLikes = res.data.data.likes;
        const newPosts = res.data.data.posts;
        if (newLikes) {
          let arrLiked: any = [];
          newLikes.forEach((like: any) => {
            let liked = newPosts.find(
              (post: any) => like.whatIsCheckedId === post._id
            );
            arrLiked.push(liked);
          });
          setAllLikedPosts(arrLiked.reverse());
        }
      }
    }
  };

  useEffect(() => {
    getAllLikedPosts();
  }, [likesChanged, isRateSubmitted]);

  const handleRating = (rate: number) => {
    setRatingValue(rate);
  };

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
    setDefPageNumber(Number(sessionStorage.getItem("pageNumber")));
  }, []);

  useEffect(() => {
    if (dataFromSelect) {
      handleDataFromSelect(dataFromSelect);
    }
  }, [dataFromSelect]);

  //get users details
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      setUserEmail(res.data.data.email);
      setUserName(res.data.data.userName);
      if(res.data.data.isAdmin) {
        setIsAdmin(res.data.data.isAdmin)
      }
      if(res.data.data.isUserBlocked) {
        setIsBlocked(res.data.data.isUserBlocked)
      }
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

  //avoid empty tenPosts when changes countPosts equal *10 ?????????????????????????
  useEffect(() => {
    if (posts && tenPosts && tenPosts.length === 0) {
      const defNumber = Number(sessionStorage.getItem("pageNumber"));
      if (defNumber && defNumber !== 1) {
        setTenPosts(
          posts.slice((defNumber - 1) * 10 - 10, (defNumber - 1) * 10)
        );
        sessionStorage.setItem("pageNumber", (defNumber - 1).toString());
      }
    }
  }, [tenPosts]);

  const createOrUpdateLike = async (postId: any) => {
    try {
      if (postId && userEmail && !isBlocked) {
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
      if (dataFromSelect?.region) {
        const response = await axios.post(
          "/api/users/getposts",
          dataFromSelect
        );
        setPosts(response.data.data);
        setIsDefaultData(false);
        //ten posts
        setCountPosts(response.data.data.length);
        if (defPageNumber) {
          const defNumber = Number(sessionStorage.getItem("pageNumber"));
          setTenPosts(
            response.data.data.slice(defNumber * 10 - 10, defNumber * 10)
          );
        } else {
          setTenPosts(response.data.data.slice(0, 10));
        }
        return;
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
            //ten posts
            setCountPosts(response.data.data.length);
            if (defPageNumber) {
              setTenPosts(
                response.data.data.slice(
                  defPageNumber * 10 - 10,
                  defPageNumber * 10
                )
              );
            } else {
              setTenPosts(response.data.data.slice(0, 10));
            }
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
  }, [
    dataFromSelect?.region,
    dataFromSelect?.city,
    dataFromSelect?.category,
    dataFromSelect?.service,
  ]);

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
  }, [
    defDataFromSelect?.region,
    defDataFromSelect?.city,
    defDataFromSelect?.category,
    defDataFromSelect?.service,
  ]);

  // const getAllPosts = async () => {
  //   const res = await axios.get("/api/users/getallposts");
  //   if (res.data.message === "Posts found") {
  //     setAllPosts(res.data.data);
  //     setIsAllPostsFound(!isAllPostsFound);
  //   }
  // };

  // const getLikedPosts = () => {
  //   if (likes) {
  //     let arrLiked: any = [];
  //     likes.forEach((like: any) => {
  //       let liked = allPosts.find(
  //         (post: any) => like.whatIsCheckedId === post._id
  //       );
  //       arrLiked.push(liked);
  //     });
  //     setLikedPosts(arrLiked.reverse());
  //   }
  // };

  useEffect(() => {
    getLikes();
    // getAllPosts()
  }, [likesChanged, userEmail]);

  useEffect(() => {
    getLikes();
    // getAllPosts();
    getUserDetails();
    // getLikedPosts();
  }, []);

  useEffect(() => {
    getPosts();
    getLikes();
    setIsShowedLikedPosts(false);
    setIsShowedSearchedPosts(true);
  }, [
    dataFromSelect?.region,
    dataFromSelect?.city,
    dataFromSelect?.category,
    dataFromSelect?.service,
  ]);

  const getRate = async (post: any) => {
    if (userEmail) {
      await axios.post("/api/users/getrate", {
        userName: userName,
        choosenEmail: post.userId,
        userEmail: userEmail,
        ratingValue: ratingValue,
        postId: post._id,
        text: text,
      });
      setText("");
      setIsRateSubmitted(!isRateSubmitted);
    }
  };

  useEffect(() => {
    if (isShowedSearchedPosts) {
      getPosts();
      // getAllPosts();
      setIsShowedLikedPosts(false);
      setIsShowedSearchedPosts(true);
    }
    if (isShowedLikedPosts) {
      // getAllPosts();
      getPosts();
    }
  }, [isRateSubmitted]);

  useEffect(() => {
    if (isShowedLikedPosts) {
      // getLikedPosts();
      setIsShowedSearchedPosts(false);
      setIsShowedLikedPosts(true);
    }
  }, [isAllPostsFound]);

  const isRatePossible = async (post: any) => {
    const postId = post._id;
    if (userEmail && !isBlocked) {
      const res = await axios.post("/api/users/isratepossible", {
        choosenEmail: post.userId,
        userEmail: userEmail,
      });
      if (res.data.message === "Rate possible") {
        setShowRateId(postId);
        setVisible(!visible);
      }
    }
  };

  const getTenPosts = (pageNumber: any) => {
    if (posts) {
      setTenPosts(posts.slice(pageNumber * 10 - 10, pageNumber * 10));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div>
        <Select onData={handleDataFromSelect} />
      </div>
      <div className="flex flex-col justify-center items-center">
      {userEmail && isAdmin && (
          <button
            onClick={() => router.push("/admin")}
            className="border-2 hover:border-white w-52 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
          >
            Адміністрування
          </button>
        )}
        <button
          disabled={buttonDisabled}
          onClick={() => {
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
            getAllLikedPosts();
            // getLikedPosts();
            setIsShowedLikedPosts(true);
            setIsShowedSearchedPosts(false);
          }}
          className="w-52 mb-6 rounded-lg p-3 text-white bg-gradient-to-r from-yellow-400 to-blue-500 hover:to-blue-700 border-2 hover:border-white"
        >
          <p className="flex justify-evenly">
            <span className="pt-0.5 text-lg">
              <FcLike className="opacity-70" />
            </span>
            <span>Показати обрані</span>
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
          {loading && (
            <div className="flex flex-col items-center mt-4">
              <p className="mb-4 text-lg">Зачекайте будь ласка...</p>
              <Spinner />
            </div>
          )}

          {tenPosts && isShowedSearchedPosts && (
            <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
              {tenPosts.map((item: any) => {
                return (
                  <div
                    key={item._id}
                    className=" border-2 hover:border-white rounded-md"
                  >
                    <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                      <div className="flex justify-between mb-1">
                        <Link
                          href={`/user/${encrypt(item?.userId, simpleKey)}`}
                          className="text-sm text-gray-700 hover:text-blue-900"
                        >
                          {item.userName}
                        </Link>
                        <div className="flex">
                          {/* rating start*/}
                          <div className="relative inline-block">
                            <div className="flex justify-start w-14 mt-0.5">
                              <button
                                onClick={() => isRatePossible(item)}
                                className="flex items-center pl-1"
                              >
                                <div className="mr-1">
                                  <FaRegStar className="text-sm text-yellow-600" />
                                </div>
                                <div>
                                  <p
                                    className={`text-xs ${
                                      Number(item.rate) <= 3.5
                                        ? "text-red-700"
                                        : "text-teal-700"
                                    }  font-mono font-semibold`}
                                  >
                                    {item.rate.length > 1
                                      ? item.rate.substr(0, 3)
                                      : item.rate + ".0"}
                                  </p>
                                </div>
                              </button>
                            </div>
                            {visible &&
                              userEmail &&
                              item._id === showRateId &&
                              userEmail !== item.userId && (
                                <div className="absolute z-10 -ml-44 -mt-32 flex flex-col items-center px-3 py-2 text-xs text-slate-500 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 min-w-60">
                                  <div
                                    onClick={() => setVisible(false)}
                                    className="flex w-full justify-end text-xl hover:cursor-pointer"
                                  >
                                    <IoClose />
                                  </div>
                                  <p className="text-center mb-2">
                                    Ви можете поставити оцінку тільки одному
                                    оголошенню кожного користувача.
                                  </p>
                                  <div>
                                    <Rating
                                      SVGstyle={{ display: "inline" }}
                                      className="inline-flex"
                                      size={20}
                                      onClick={handleRating}
                                      initialValue={ratingValue}
                                      allowHover={false}
                                    />
                                  </div>
                                  {/* textarea start */}
                                  <label
                                    htmlFor="w3review"
                                    className="block mb-1 mt-1 text-xs font-medium text-gray-900"
                                  >
                                    Коментар:
                                  </label>
                                  <textarea
                                    onChange={(e) => {
                                      setText(e.target.value);
                                    }}
                                    value={text}
                                    id="areaId"
                                    name="area"
                                    rows={4}
                                    className="resize-none block p-2.5 w-60 text-m text-gray-900 bg-white rounded-lg border border-gray-300 f"
                                    placeholder="Напишіть короткий коментар автору оголошення."
                                  ></textarea>
                                  <span className="text-gray-500 mt-1">
                                    Залишилося {120 - text.length} символів.
                                  </span>
                                  {/* textarea end */}
                                  <button
                                    onClick={() => {
                                      getRate(item);
                                      setVisible(false);
                                    }}
                                    disabled={ratingValue === 0}
                                    className={`mt-3 mb-1 ${
                                      ratingValue === 0
                                        ? "bg-slate-500"
                                        : "bg-black"
                                    }  p-2 rounded-md text-white`}
                                  >
                                    Відправити
                                  </button>
                                </div>
                              )}
                          </div>
                          {/* rating end */}
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => createOrUpdateLike(item._id)}
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
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <div className="flex">
                          <FiMapPin className="mr-1 pt-0.5" />
                          <p className="text-gray-700 text-xs">{item.city}</p>
                        </div>
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

          {allLikedPosts && allLikedPosts.length > 0 && isShowedLikedPosts && (
            // {likedPosts && likedPosts.length > 0 && isShowedLikedPosts && (
            <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
              {allLikedPosts.map((item: any) => {
                return (
                  <div
                    key={item?._id}
                    className=" border-2 hover:border-white rounded-md"
                  >
                    <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                      <div className="flex justify-between mb-1">
                        <Link
                          href={`/user/${encrypt(item?.userId, simpleKey)}`}
                          className="text-sm text-gray-700 hover:text-blue-900"
                        >
                          {item?.userName}
                        </Link>
                        {/* rating start*/}
                        <div className="flex">
                          <div className="relative inline-block">
                            <div className="flex justify-start w-14 mt-0.5">
                              <button
                                onClick={() => isRatePossible(item)}
                                className="flex items-center pl-1"
                              >
                                <div className="mr-1">
                                  <FaRegStar className="text-sm text-yellow-600" />
                                </div>
                                <div>
                                  <p
                                    className={`text-xs ${
                                      Number(item?.rate) <= 3.5
                                        ? "text-red-700"
                                        : "text-teal-700"
                                    }  font-mono font-semibold`}
                                  >
                                    {item?.rate.length > 1
                                      ? item?.rate.substr(0, 3)
                                      : item?.rate + ".0"}
                                  </p>
                                </div>
                              </button>
                            </div>
                            {visible &&
                              userEmail &&
                              item?._id === showRateId &&
                              userEmail !== item?.userId && (
                                <div className="absolute z-10 -ml-44 -mt-32 flex flex-col items-center px-3 py-2 text-xs text-slate-500 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 min-w-60">
                                  <div
                                    onClick={() => setVisible(false)}
                                    className="flex w-full justify-end text-xl hover:cursor-pointer"
                                  >
                                    <IoClose />
                                  </div>
                                  <p className="text-center mb-2">
                                    Ви можете поставити оцінку тільки одному
                                    оголошенню кожного користувача.
                                  </p>
                                  <div>
                                    <Rating
                                      SVGstyle={{ display: "inline" }}
                                      className="inline-flex"
                                      size={20}
                                      onClick={handleRating}
                                      initialValue={ratingValue}
                                      allowHover={false}
                                    />
                                  </div>
                                  {/* textarea start */}
                                  <label
                                    htmlFor="w3review"
                                    className="block mb-1 mt-1 text-xs font-medium text-gray-900"
                                  >
                                    Коментар:
                                  </label>
                                  <textarea
                                    onChange={(e) => {
                                      setText(e.target.value);
                                    }}
                                    value={text}
                                    id="areaId"
                                    name="area"
                                    rows={4}
                                    className="resize-none block p-2.5 w-60 text-m text-gray-900 bg-white rounded-lg border border-gray-300 f"
                                    placeholder="Напишіть короткий коментар автору оголошення."
                                  ></textarea>
                                  <span className="text-gray-500 mt-1">
                                    Залишилося {120 - text.length} символів.
                                  </span>
                                  {/* textarea end */}
                                  <button
                                    onClick={() => {
                                      getRate(item);
                                      setVisible(false);
                                    }}
                                    disabled={ratingValue === 0}
                                    className={`mt-3 mb-1 ${
                                      ratingValue === 0
                                        ? "bg-slate-500"
                                        : "bg-black"
                                    }  p-2 rounded-md text-white`}
                                  >
                                    Відправити
                                  </button>
                                </div>
                              )}
                          </div>
                          {/* rating end */}
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => createOrUpdateLike(item?._id)}
                          >
                            {likes && (
                              <div>
                                {likes.map((like: any) => {
                                  const isLike =
                                    like.whatIsCheckedId === item?._id &&
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
                      </div>
                      <div className="flex justify-between text-gray-800">
                        <div className="flex">
                          <FiMapPin className="mr-1 pt-0.5" />
                          <p className="text-gray-700 text-xs">{item?.city}</p>
                        </div>
                        <span className="text-xs">
                          {item?.date.slice(0, 10)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 mb-6 text-sm px-3">{item?.text}</div>
                  </div>
                );
              })}
            </div>
          )}
          {isShowedSearchedPosts && !loading && Number(countPosts) > 10 && (
            <div className="mt-4 flex flex-col w-80 md:w-80 lg:w-96 p-1">
              <div className="flex justify-center">
                {arr.map((item: any, index: number) => {
                  return (
                    <button
                      disabled={!(Number(countPosts) > (item - 1) * 10)}
                      key={item}
                      onClick={() => {
                        getTenPosts(item);
                        sessionStorage.setItem("pageNumber", item.toString());
                      }}
                      className={`${
                        !(Number(countPosts) > (item - 1) * 10)
                          ? "hidden"
                          : `text-blue-600 p-1 px-2 font-mono text-lg ${
                              sessionStorage.getItem("pageNumber") &&
                              item ===
                                Number(sessionStorage.getItem("pageNumber")) &&
                              "underline"
                            }`
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
