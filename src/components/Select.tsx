"use client";
import React, { useEffect } from "react";
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

// interface SelectProps {
//   region: string;
//   city: string;
//   category: string;
//   serviceType: string;
// }

export interface SelectProps {
  region: string;
  city: string;
  category: string;
  service: string;
}
interface ChildComponentProps {
  onData: (data: SelectProps) => void;
}
export default function Select({ onData }: ChildComponentProps) {
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [cities, setCities] = useState<Cities>();
  const [category, setCategory] = useState("");
  const [serviceType, setServiceType] = useState("");

  const sendDataToProfilePage = () => {
    const data: SelectProps = {
      region: region,
      city: city,
      category: category,
      service: serviceType,
    };
    onData(data);
  };

  useEffect(() => {
    sendDataToProfilePage();
  }, [region, city, category, serviceType]);

  // console.log(region);
  // console.log(city);
  // console.log(cities);
  // console.log(regions);
  // console.log(category);
  return (
    <div className="flex flex-col">
      <select
        className="p-3 w-80 bg-gray-50 rounded-md mb-5"
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
        className="p-3 w-80 bg-gray-50 rounded-md mb-5"
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
        className="p-3 w-80 bg-gray-50 rounded-md mb-5"
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
      <select
        className="p-3 w-80 bg-gray-50 rounded-md"
        onChange={(e) => {
          setServiceType(e.target.value);
        }}
      >
        {serviceType === "" && (
          <option className="text-slate-500">Виберіть послугу</option>
        )}

        <option key="Пропоную роботу" value="Пропоную роботу">
          Пропоную роботу
        </option>
        <option key="Надаю послугу" value="Надаю послугу">
          Надаю послугу
        </option>
      </select>
    </div>
  );
}
