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
  const [cities, setCities] = useState<Cities>();
  const [region, setRegion] = useState<any>("");
  const [city, setCity] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const [serviceType, setServiceType] = useState<any>("");

  useEffect(() => {
    if (localStorage.getItem("region")) {
      setRegion(localStorage.getItem("region"));
      regions.map((item) => {
        if (item.name === localStorage.getItem("region")) {
          setCities(item);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("city")) {
      setCity(localStorage.getItem("city"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("category")) {
      setCategory(localStorage.getItem("category"));
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("serviceType")) {
      setServiceType(localStorage.getItem("serviceType"));
    }
  }, []);

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

  // setTimeout(() => {
  //   sendDataToProfilePage();
  // }, 1000);

  return (
    <div className="flex flex-col">
      <select
        className="p-3 w-80 md:w-96 bg-gray-50 rounded-md mb-5"
        value={region}
        onChange={(e) => {
          setCity("");
          setRegion(e.target.value);
          localStorage.setItem("region", e.target.value);
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
        {region && (
          <option key={region} value={region}>
            {region}
          </option>
        )}
        {regions.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="p-3 w-80 md:w-96 bg-gray-50 rounded-md mb-5"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          localStorage.setItem("city", e.target.value);
        }}
      >
        {city === "" && (
          <option className="text-slate-500">Виберіть місто</option>
        )}
        {city && (
          <option key={city} value={city}>
            {city}
          </option>
        )}
        {cities?.cities?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="p-3 w-80 md:w-96 bg-gray-50 rounded-md mb-5"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          localStorage.setItem("category", e.target.value);
        }}
      >
        {category === "" && (
          <option className="text-slate-500">Виберіть категорію</option>
        )}
        {category && (
          <option key={category} value={category}>
            {category}
          </option>
        )}
        {categories?.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="p-3 w-80 md:w-96 bg-gray-50 rounded-md"
        value={serviceType}
        onChange={(e) => {
          setServiceType(e.target.value);
          localStorage.setItem("serviceType", e.target.value);
        }}
      >
        {serviceType === "" && (
          <option className="text-slate-500">Виберіть послугу</option>
        )}
        {serviceType && (
          <option key="" value={serviceType}>
            {serviceType}
          </option>
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
