"use client";
import Select from "./Select";
import { SelectProps } from "./Select";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface PostProps {
  city: string;
  category: string;
  service: string;
}

export default function Main() {
  const [dataFromSelect, setDataFromSelect] = useState<SelectProps | null>(
    null
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [posts, setPosts] = useState<any>();
  const [loading, setLoading] = useState(false);

  const handleDataFromSelect = (data: SelectProps) => {
    setDataFromSelect(data);
  };
  console.log(dataFromSelect);
  useEffect(() => {
    if (dataFromSelect) {
      // console.log("first")
      handleDataFromSelect(dataFromSelect);
    }
  }, [dataFromSelect]);
  console.log(posts);

  const postData = async () => {
    try {
      setLoading(true);
      if (dataFromSelect) {
        const response = await axios.post("/api/users/getposts",dataFromSelect);

        console.log(response.data.data);
        setPosts(response.data.data);
        console.log("Post success");
      }

      // router.refresh();
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
    <div>
      <Select onData={handleDataFromSelect} />
      <div className="flex flex-col items-center justify-center">
        <button
          disabled={buttonDisabled}
          onClick={postData}
          className="border-white w-40 rounded-lg p-3 text-white bg-black mt-6 mb-4 hover:bg-slate-700"
        >
          {!buttonDisabled ? "Пошук" : "disabled"}
        </button>
        {posts && (
          <>
            {posts.map((item: any) => {
              return (
                <div key={item.city} className="mb-2">
                  <div className="w-80 bg-slate-300 flex justify-between px-2 text-sm h-6">
                    <span>{item.city}</span>
                    <span>zberegtu</span>
                  </div>
                  <div className="px-2">{item.text}</div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
