"use client";

import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { redondear } from "~/helpers/decimales";

// gravedad
const g = 9.8;
// resistencia
const c = 12.5;

type Fila = { t: number; v: number };

function f(m: number, t: number) {
  return ((g * m) / c) * (1 - Math.pow(Math.E, -(c / m) * t));
}

export default function Paracaidista() {
  const [peso, setPeso] = useState(68.1);
  const [intervalo, setIntervalo] = useState(2);
  const [datos, setDatos] = useState<Fila[]>();

  function actualizarIntervalo(v: any) {
    let n = Number.parseFloat(v);
    if (!Number.isNaN(n)) setIntervalo(n);
  }

  function actualizarPeso(v: any) {
    let n = Number.parseFloat(v);
    if (!Number.isNaN(n)) setPeso(n);
  }

  useEffect(() => {
    let t = 0,
      v;
    let arr: Fila[] = [{ t, v: f(peso, t) }];

    while (true) {
      t += intervalo;
      v = redondear(f(peso, t), 2);
      if (v == arr[arr.length - 1].v) break;
      arr.push({ v, t });
    }

    setDatos(arr);
  }, [peso, intervalo]);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row max-w-6xl mx-auto my-0 justify-start">
        <div className="w-full md:w-48 flex flex-col gap-2">
          <div>
            <span>Intervalo: </span>
            <input
              type="number"
              className="border bg-black/10 p-1 w-12 text-center"
              onChange={(e) => actualizarIntervalo(e.target.value)}
              value={intervalo}
            />
          </div>
          <div>
            <span>Peso: </span>
            <input
              type="number"
              className="border bg-black/10 p-1 w-16 text-center"
              onChange={(e) => actualizarPeso(e.target.value)}
              value={peso}
            />
          </div>
          {datos && (
            <table className="w-full border">
              <thead>
                <tr className="bg-black/20">
                  <th>t</th>
                  <th>v</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((v) => (
                  <tr key={v.t} className="text-center even:bg-black/10">
                    <td>{v.t}</td>
                    <td>{v.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-grow w-full">
          {datos && (
            <Line
              plugins={[ChartDataLabels]}
              options={{
                plugins: {
                  datalabels: {
                    align: "top",
                  },
                },
                responsive: true,
              }}
              data={{
                labels: datos.map((v) => v.t),
                datasets: [
                  {
                    label: "Velocidad",
                    data: datos.map((v) => v.v),
                    fill: false,
                    borderColor: "rgb(75, 192, 192)",
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
