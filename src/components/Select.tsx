"use client";
import React from "react";
import { useState } from "react";
import regions from "@/data/regions";
import categories from "@/data/categories";

interface Cities {
  name: string;
  center: string;
  cities: Array<{ name: string; lat: string; lng: string }>;
}
// interface Categories {
//     categories: Array<{ name: string; }>;
//   }

export default function Select() {
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<Cities>();
  // const [category, setCategory] = useState<Categories>();
  const [category, setCategory] = useState("");
  // console.log(region);
  // console.log(city);
  // console.log(cities);
  // console.log(regions);
  // console.log(category);
  return (
    <div className="flex">
      <select
        className="p-2 w-80 bg-gray-50 rounded-md"
        onChange={(e) => {
          setCity("");
          setRegion(e.target.value);
          regions.map((item) => {
            if (item.name === e.target.value) {
              setCities(item);
            }
          });
        }}
      >
        {region === "" && (
          <option className="text-slate-500">Виберіть область</option>
        )}
        {regions.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="p-2 w-60 ml-5 bg-gray-50 rounded-md"
        onChange={(e) => {
          setCity(e.target.value);
        }}
      >
        {city === "" && (
          <option className="text-slate-500">Виберіть місто</option>
        )}
        {cities?.cities?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="p-2 w-60 ml-5 bg-gray-50 rounded-md"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      >
        {category === "" && (
          <option className="text-slate-500">Виберіть категорію</option>
        )}
        {categories?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
