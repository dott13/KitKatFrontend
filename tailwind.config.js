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
        cardname: "#0F172A",
        cardmail: "#64748B",
        dots: "#94A3B8",
        filters: "#8A7D66",
      },
      boxShadow: {
        'xl': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
      },
    },
  },
  plugins: [],
};
