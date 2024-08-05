"use client";
import React from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import { FaArrowLeft } from "react-icons/fa6";
import { Rating } from "react-simple-star-rating";

const UserPage = ({ params }: { params: { userId: string } }) => {
  const user = params.userId.replace("%40", "@");
  const [loading, setLoading] = useState(false);
  const [userRate, setUserRate] = useState("");
  const [userRateCount, setUserRateCount] = useState("");
  const [comments, setComments] = useState<any>();
  const [userName, setUserName] = useState("");

  const getUserInfo = async () => {
    const userInfo = await axios.post("/api/users/getuserinfo", {
      email: user,
    });
    const userComments = await axios.post("/api/users/getusercomments", {
      email: user,
    });
    setComments(
      userComments.data.data
        .reverse()
        .filter((item: any) => item.comment !== "")
        .slice(0,20)
    );
    setUserRate(userInfo.data.data.rate);
    setUserRateCount(userInfo.data.data.countRate);
    setUserName(userInfo.data.data.userName);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      {userRate ? (
        <div className="mt-6 flex flex-col items-center min-w-80">
          <div className="flex">
            <FaArrowLeft className="relative mr-3 mt-1" />
            <Link className="" href="/">
              Назад
            </Link>
          </div>
          <div className="flex flex-col w-80 items-center mt-4">
            <div className="flex w-80 justify-between items-center mb-2 px-1">
              <p className="text-gray-600 italic">Користувач:</p>
              <p className="text-gray-600">{userName}</p>
            </div>
            <div className="flex justify-center w-80">
              <div className="flex justify-between w-80 items-center px-1">
                <p className="text-gray-600 italic">Рейтинг:</p>
              </div>
              <div className="flex items-center ml-1">
              <div className="absolute -ml-28 -mt-1">
                  <Rating
                    SVGstyle={{ display: "inline" }}
                    className="inline-flex"
                    size={22}
                    fillColor="#D4AF37"
                    readonly
                    allowFraction={true}
                    initialValue={Number(userRate.substring(0, 3))}
                  />
                </div>
                <div>
                  <span
                    className={`mr-1 ${
                      Number(userRate) <= 3.5 ? "text-red-700" : "text-teal-700"
                    }  font-mono font-semibold`}
                  >
                    {userRate.length > 1
                      ? userRate.substring(0, 3)
                      : userRate + ".0"}
                  </span>
                  <span className="font-mono font-semibold text- text-gray-500">
                    ({userRateCount}){" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center">
            {comments && comments.length > 0 ? (
              <p className="mb-2 italic text-gray-600">Останні коментарі:</p>
            ) : (
              <p className="mb-2"></p>
            )}
            {comments && comments.length > 0 ? (
              <div className="flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
                {comments.map((comment: any) => {
                  return (
                    <div
                      key={comment._id}
                      className="border-2 rounded-lg border-white mb-1 flex flex-col max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl"
                    >
                      <div className="flex flex-col justify-between bg-gradient-to-b from-gray-100 to-gray-300 px-3 rounded-md text-sm p-1">
                        <div className="flex justify-between">
                          <p className="text-gray-700">
                            {comment.whoIsCheckedName}
                          </p>
                          <div className="flex">
                            <div className="absolute -ml-24 -mt-0.5">
                              <Rating
                                SVGstyle={{ display: "inline" }}
                                className="inline-flex"
                                size={18}
                                readonly
                                allowFraction={true}
                                initialValue={Number(
                                  comment.rate.substring(0, 3)
                                )}
                              />
                            </div>
                            <div className="flex items-center">
                              <p
                                className={`text-sm ${
                                  Number(comment.rate) <= 3.5
                                    ? "text-red-700"
                                    : "text-teal-700"
                                }  font-mono font-semibold`}
                              >
                                {comment.rate.length > 1
                                  ? comment.rate.substr(0, 3)
                                  : comment.rate + ".0"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end text-gray-800">
                          <p className="text-xs">{comment.date.slice(0, 10)}</p>
                        </div>
                      </div>

                      <div className="mt-1 mb-2 text-sm px-3 flex max-sm:w-80 min-w-80 sm:max-w-lg lg:max-w-3xl">
                        {comment.comment}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                <p className="text-gray-700">У користувача поки немає коментарів.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6">
          <p className="mb-4 text-lg">Зачекайте будь-ласка</p>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default UserPage;
