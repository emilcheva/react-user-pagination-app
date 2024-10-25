/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        icon: "#1c9eff",
      },
      backgroundImage: {
        "main-gradient": "linear-gradient(to bottom right, #ff9eaa 0% 65%, #e860ff 95% 100%)",
      },
      boxShadow: {
        glow: "0px 1rem 1.5rem rgba(0,0,0,0.5)",
      },
      borderRadius: {
        xl: "2rem",
      },
      colors: {
        vivid: "#ffd01a",
        muted: "#f3f4f6",
      },
      gridTemplateColumns: {
        1: "repeat(1, minmax(0, 300px))",
        2: "repeat(2, minmax(0, 330px))",
        3: "repeat(3, minmax(0, 350px))",
      },
    },
  },
  plugins: [],
};
