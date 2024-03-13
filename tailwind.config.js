import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["bi"]),
    }),
  ],
};
