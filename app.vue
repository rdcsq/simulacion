<template>
  <main class="p-4">
    <NuxtPage />
  </main>
</template>

<style>
input[type="number"],
input[type="text"] {
  @apply rounded-lg border bg-black/10 px-2 py-1;
}

button[type="button"] {
  @apply rounded-lg bg-violet-500 px-4 py-2 text-white;
}

button[secondary] {
  @apply !bg-black/10 !text-black;
}
</style>
