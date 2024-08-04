"use client";
import React from "react";

function AboutPage() {
  return (
    <div className="flex flex-col items-center justify-center py-6 max-sm:px-6 px-20">
      <div>
        <p className="text-gray-600 text-lg max-sm:text-base">
          ЄПомічник - це сервіс, який легко допомагає користувачу знайти
          послугу, яку він потребує. Це можуть бути різні послуги по дому,
          переміщенню вантажів, ремонту помешкання, обслуговуванню побутової
          техніки, обслуговуванню котлів як газових, так і електричних, вигулу
          та перетримці домашніх улюбленців, та багато інших. Необхідну послугу
          Ви зможете знайти без реєстрації на сайті. Щоб створити своє
          оголошення, необхідно спочатку зареєструватися. Після входу Ви
          матимете можливість створити та опублікувати своє власне оголошення.
          Це може бути оголошення з категорії{" "}
          <span className="font-extrabold">надаю послугу</span> або{" "}
          <span className="font-extrabold">пропоную роботу</span>. Ви зможете
          створити не більше трьох оголошень. Все це
          безкоштовно.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
