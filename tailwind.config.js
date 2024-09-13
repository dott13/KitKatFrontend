/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#E3DDE0",
        widget: "#888485",
        input: "#BCBEC0",
        button: "#FBF9FA",
      },
    },
  },
  plugins: [],
};
