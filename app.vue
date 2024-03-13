<script setup lang="ts">
const route = useRoute();

const routes: { title: string; route: string }[] = [
  { title: "Inicio", route: "/" },
  { title: "Paracaidista", route: "/paracaidista" },
  { title: "Generador de números uniformes", route: "/generador-de-numeros" },
];

const routeIndex = computed(() =>
  routes.findIndex((item) => item.route == route.path),
);

const showLinks = ref(false);

function toggleLinksMenu() {
  window.scrollTo({ top: 0 });
  const root = document.querySelector("body");
  root!.style.overflow = showLinks.value ? "inherit" : "hidden";
  showLinks.value = !showLinks.value;
}
</script>

<template>
  <!-- Header -->
  <header class="flex w-full items-center justify-between border-b bg-black/5">
    <div class="h-12 w-12">
      <NuxtLink
        v-if="routeIndex > 0"
        :to="routes[routeIndex - 1].route"
        class="flex h-full w-full items-center justify-center hover:bg-black/5">
        <span class="i-bi-arrow-left-short text-2xl"></span>
      </NuxtLink>
    </div>
    <button
      @click="toggleLinksMenu"
      class="line-clamp-1 text-ellipsis rounded-lg px-2 py-1 hover:bg-black/5">
      {{ routes[routeIndex].title }}
      <span class="i-bi-arrow-down-short mb-1 align-middle"></span>
    </button>
    <div class="h-12 w-12">
      <NuxtLink
        v-if="routeIndex < routes.length - 1"
        :to="routes[routeIndex + 1].route"
        class="flex h-full w-full items-center justify-center hover:bg-black/5">
        <span class="i-bi-arrow-right-short text-2xl"></span>
      </NuxtLink>
    </div>
  </header>

  <!-- Backdrop -->
  <div
    @click="toggleLinksMenu"
    :class="[
      'absolute left-0 top-0 h-screen w-screen bg-black/30 transition-all',
      showLinks ? 'visible opacity-100' : 'invisible opacity-0',
    ]"
    aria-hidden="true"></div>

  <!-- Popup Nav-->
  <nav
    :class="[
      'absolute left-1/2 z-50 w-full max-w-lg -translate-x-1/2 p-4 transition-all',
      showLinks
        ? 'visible top-2 scale-100 opacity-100'
        : 'invisible top-0 scale-95 opacity-0',
    ]">
    <div class="rounded-lg bg-zinc-100 p-2 drop-shadow-md">
      <p class="my-2 text-center font-bold">Pages</p>
      <NuxtLink
        v-for="link in routes"
        :to="link.route"
        @click="toggleLinksMenu"
        class="block rounded-lg px-2 py-1 hover:bg-black/10"
        active-class="bg-black/5"
        >{{ link.title }}</NuxtLink
      >
    </div>
  </nav>

  <!-- Contents -->
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
