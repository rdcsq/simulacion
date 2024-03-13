<script setup lang="ts">
useSeoMeta({
  title: "Generador de números",
});

const numbers = ref(randomInteger(1, 1000).toString());
const data = ref<number[]>([]);

function generateRandomNumber() {
  numbers.value = randomInteger(1, 1000).toString();
  generateData();
}

function generateData() {
  const n = Number.parseInt(numbers.value);
  if (Number.isNaN(n)) return;

  let array: number[] = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }
  data.value = array;
}

onMounted(() => generateData());
</script>

<template>
  <div class="mx-auto my-0 max-w-xl">
    <div class="flex w-full justify-center gap-2 text-center">
      <input type="number" v-model="numbers" />
      <button type="button" secondary @click="generateRandomNumber">
        Aleatorio
      </button>
      <button type="button" @click="generateData">Generar</button>
    </div>
    <div class="mt-4">
      <p v-for="number in data">{{ number }}</p>
    </div>
  </div>
</template>
