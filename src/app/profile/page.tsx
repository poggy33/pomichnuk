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
  }, [text]);

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(post)

  const createPost = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/post", post);
      console.log("Response success", response.data);
      setText("")
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
    <>
      <div className="flex">
        <div className="bg-indigo-200 flex flex-col text-center min-h-screen justify-items-center w-1/6  p-4">
          <h1>hello</h1>
        </div>
        <div className="flex flex-grow flex-col items-center min-h-screen py-4 bg-indigo-100">
          <Select onData={handleDataFromSelect} />
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
          <span className="text-gray-500 mt-1">Залишилося {300-text.length} символів</span>  
          <button
            onClick={createPost}
            disabled={buttonDisabled}
            className="border-white w-40 rounded-lg p-3 text-white bg-black mt-4 hover:bg-slate-700"
          >
            {!buttonDisabled ? "Опублікувати" : "disabled"}
          </button>
        </div>
      </div>
    </>
  );
}
