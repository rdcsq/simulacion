"use client";

import { useState } from "react";
import { randomNumber } from "~/helpers/random-number";

export default function Page() {
  const [numbers, setNumbers] = useState(randomNumber(1, 1000).toString());
  const [numbersList, setNumbersList] = useState<number[]>([]);

  function automaticMode() {
    setNumbers(randomNumber(1, 1000).toString());
    generate();
  }

  function generate() {
    const n = Number.parseInt(numbers);
    if (Number.isNaN(n)) return;

    let a: number[] = [];
    for (let i = 0; i < n; i++) {
      a[i] = Math.random();
    }
    setNumbersList(a);
  }

  return (
    <div className="mx-auto my-0 max-w-xl">
      <div className="w-full justify-center text-center flex gap-2">
        <input
          type="number"
          value={numbers}
          onChange={(e) => setNumbers(e.target.value)}
          className="border bg-black/10 rounded-lg px-4 py-2 w-36"
        />
        <button
          className="bg-black/10 border rounded-lg px-4 py-2"
          onClick={automaticMode}
        >
          Aleatorio
        </button>
        <button
          className="bg-purple-500 text-white border rounded-lg px-4 py-2"
          onClick={generate}
        >
          Generar
        </button>
      </div>
      <div className="mt-4">
        {numbersList.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </div>
  );
}
