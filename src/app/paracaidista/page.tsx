"use client";

import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { round } from "~/helpers/decimals";

// gravedad
const g = 9.8;
// resistencia
const c = 12.5;

type Fila = { t: number; v: number };

function f(m: number, t: number) {
  return ((g * m) / c) * (1 - Math.pow(Math.E, -(c / m) * t));
}

export default function Paracaidista() {
  const [decimals, setDecimals] = useState(15);
  const [mass, setMass] = useState(68.1);
  const [interval, setInterval] = useState(2);
  const [data, setData] = useState<Fila[]>();

  useEffect(() => {
    if (Number.isNaN(mass) || Number.isNaN(interval)) return;

    let t = 0,
      v = round(f(mass, t), decimals);

    let arr: Fila[] = [{ t, v }];

    while (true) {
      t += interval;
      v = round(f(mass, t), decimals);
      if (v == arr[arr.length - 1].v) break;
      arr.push({ v, t });
    }

    setData(arr);
  }, [mass, interval, decimals]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row max-w-6xl mx-auto my-0 justify-start">
        <div className="w-full md:w-48 flex flex-col gap-2">
          <div>
            <span>Intervalo: </span>
            <input
              type="number"
              className="border bg-black/10 p-1 w-12 text-center"
              onChange={(e) => setInterval(Number.parseInt(e.target.value))}
              value={interval}
            />
          </div>
          <div>
            <span>Peso: </span>
            <input
              type="number"
              className="border bg-black/10 p-1 w-16 text-center"
              onChange={(e) => setMass(Number.parseFloat(e.target.value))}
              value={mass}
            />
          </div>
          <div>
            <span>Decimales: </span>
            <input
              type="number"
              className="border bg-black/10 p-1 w-16 text-center"
              onChange={(e) => setDecimals(Number.parseInt(e.target.value))}
              value={decimals}
            />
          </div>
          {data && (
            <table className="w-full border">
              <thead>
                <tr className="bg-black/20">
                  <th>t</th>
                  <th>v</th>
                </tr>
              </thead>
              <tbody>
                {data.map((v) => (
                  <tr key={v.t} className="text-center even:bg-black/10">
                    <td>{v.t}</td>
                    <td>{v.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-grow w-full relative">
          {data && (
            <Line
              plugins={[ChartDataLabels]}
              options={{
                plugins: {
                  datalabels: {
                    align: "top",
                  },
                },
                responsive: true,
                scales: {
                  y: {
                    ticks: {
                      stepSize: 5,
                    },
                  },
                },
              }}
              data={{
                labels: data.map((v) => v.t),
                datasets: [
                  {
                    label: "Velocidad",
                    data: data.map((v) => v.v),
                    fill: true,
                    borderColor: "purple",
                    tension: 0.1,
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
