"use client";
import Select from "./Select";
import { SelectProps } from "./Select";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Main() {
  const [dataFromSelect, setDataFromSelect] = useState<SelectProps | null>(
    null
  );

  const handleDataFromSelect = (data: SelectProps) => {
    setDataFromSelect(data);
  };
console.log(dataFromSelect)
  useEffect(() => {
    if (dataFromSelect) {
      // console.log("first")
handleDataFromSelect(dataFromSelect)
    }
  }, [dataFromSelect]);

  return (
    <div>
     <Select onData={handleDataFromSelect} />
    </div>
  );
}
