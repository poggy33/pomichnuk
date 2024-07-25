"use client";
import Select from "@/components/Select";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { SelectProps } from "@/components/Select";

export default function ProfilePage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectCategory, setIsCorrectCategory] = useState(false);
  const [isCorrectCity, setIsCorrectCity] = useState(false);
  const [post, setPost] = useState({
    region: "",
    city: "",
    category: "",
    service: "",
    text: "",
    userId: "",
  });

  //get users details
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/currentuser");
    if (res.data.message === "User found") {
      console.log(res.data.data.email);
      setUserEmail(res.data.data.email);
      setIsVerified(res.data.data.isVerified);
      setIsLoading(true);
      console.log(res.data.data.isVerified);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const [dataFromSelect, setDataFromSelect] = useState<SelectProps | null>(
    null
  );

  const handleDataFromSelect = (data: SelectProps) => {
    setDataFromSelect(data);
  };

  useEffect(() => {
    if (dataFromSelect) {
      setPost({ ...dataFromSelect, text: text, userId: userEmail });
    }
  }, [text, dataFromSelect]);

  useEffect(() => {
    if (dataFromSelect?.category === "Всі оголошення") {
      setIsCorrectCategory(true);
    } else {
      setIsCorrectCategory(false);
    }
    if (dataFromSelect?.city === "Всі міста") {
      setIsCorrectCity(true);
    } else {
      setIsCorrectCity(false);
    }
  }, [dataFromSelect]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(post)

  const createPost = async () => {
    try {
      if (
        dataFromSelect?.category !== "Всі оголошення" &&
        dataFromSelect?.city !== "Всі міста"
      ) {
        setLoading(true);
        const response = await axios.post("/api/users/post", post);
        console.log("Response success", response.data);
        setText("");
        setIsCorrectCategory(false);
        setIsCorrectCity(false);
        router.push("/");
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      post.region.length > 0 &&
      post.city.length > 0 &&
      post.category.length > 0 &&
      post.service.length > 0 &&
      post.text.length > 20 &&
      post.text.length < 301
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [post]);

  return (
    <div className="">
      {isVerified && (
        <div className="flex">
          <div className="flex flex-grow flex-col items-center  py-4">
            <Select onData={handleDataFromSelect} />
            {(isCorrectCategory || isCorrectCity) &&(
              <p className="flex mt-1 text-xs text-red-700">
                Спочатку виберіть категорію та місто
              </p>
            )}
            <label
              htmlFor="w3review"
              className="block mb-2 mt-4 text-sm font-medium text-gray-900"
            >
              Ваше оголошення:
            </label>
            <textarea
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
              id="areaId"
              name="area"
              rows={8}
              className="resize-none block p-2.5 w-1/2 min-w-80 text-m text-gray-900 bg-white rounded-lg border border-gray-300 f"
              placeholder="Опишіть коротко Вашу послугу (20-300 символів) та залиште контакти для зв'язку..."
            ></textarea>
            <span className="text-gray-500 mt-1">
              Залишилося {300 - text.length} символів
            </span>
            <button
              onClick={createPost}
              disabled={buttonDisabled}
              className={
                buttonDisabled
                  ? "bg-slate-400 border-white w-40 mb-8 rounded-lg p-3 text-white mt-4"
                  : "border-white w-40 mb-8 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
              }
            >
              Опублікувати
            </button>
          </div>
        </div>
      )}
      {!isVerified && isLoading && (
        <div className="flex flex-col items-center text-slate-700 text-center mt-6">
          <h1>Пройдіть спочатку верифікацію пошти</h1>
        </div>
      )}
    </div>
  );
}
