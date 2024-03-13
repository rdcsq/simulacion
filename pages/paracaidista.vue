<script setup lang="ts">
import {
  CategoryScale,
  Chart,
  LinearScale,
  type ChartData,
  Title,
  Tooltip,
  PointElement,
  LineElement,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";

useSeoMeta({
  title: "Paracaidista",
});

const m = 68.1;
const g = 9.8;
const c = 12.5;

const decimals = ref("16");
const interval = ref("2");
const data = ref<number[][]>([]);

const f = (t: number) => ((g * m) / c) * (1 - Math.pow(Math.E, -(c / m) * t));

function generateData() {
  const numberDecimals = Number.parseInt(decimals.value);
  const numberInterval = Number.parseInt(interval.value);
  if (Number.isNaN(numberDecimals) || Number.isNaN(numberInterval)) return;

  let t = 0;
  let v = roundDecimals(f(t), numberDecimals);

  let table: number[][] = [[t, v]];
  while (true) {
    t += numberInterval;
    v = roundDecimals(f(t), numberDecimals);
    if (v == table[table.length - 1][1]) break;
    table.push([t, v]);
  }

  data.value = table;
}

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
  Filler,
);

const chartData = computed(
  (): ChartData<"line", number[], number> => ({
    labels: data.value.map((v) => v[0]),
    datasets: [
      {
        label: "Velocidad",
        data: data.value.map((v) => v[1]),
        fill: true,
        borderColor: "purple",
      },
    ],
  }),
);

onMounted(() => generateData());

watch([decimals, interval], generateData);
</script>

<template>
  <div
    class="mx-auto my-0 flex max-w-6xl flex-col-reverse justify-start md:flex-row">
    <div class="flex w-full flex-col gap-2 md:w-52">
      <div>
        <span>Intervalo: </span>
        <input type="number" v-model="interval" class="w-16" />
      </div>
      <div>
        <span>Decimales: </span>
        <input type="number" v-model="decimals" class="w-16" />
      </div>
      <table>
        <thead>
          <tr class="bg-black/10 text-center font-bold">
            <td>t</td>
            <td>v</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in data" class="odd:bg-black/5">
            <td class="bg-black/5 text-center">{{ row[0] }}</td>
            <td>{{ row[1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="relative flex w-full flex-row">
      <Line
        :data="chartData"
        :plugins="[ChartDataLabels]"
        :options="{
          responsive: true,
          scales: {
            y: {
              ticks: {
                stepSize: 5,
              },
            },
          },
          plugins: {
            datalabels: {
              align: 'top',
            },
          },
        }" />
    </div>
  </div>
</template>
