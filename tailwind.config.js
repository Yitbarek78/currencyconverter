/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./public/index.html"],

  safelist: [
    "bg-indigo-500",
    "rounded-full",
    "p-3",
    "shadow-md",
    "hover:bg-indigo-600",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: false, // disable dark mode
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {~
//     extend: {},
//   },
//   plugins: [],
// };
