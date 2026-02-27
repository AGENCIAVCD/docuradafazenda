/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDD0",
        caramel: "#8B4513",
        forest: "#2E4A23",
      },
      fontFamily: {
        title: ["Playfair Display", "serif"],
        body: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 32px rgba(139, 69, 19, 0.16)",
      },
      animation: {
        "float-pulse": "floatPulse 2.4s ease-in-out infinite",
      },
      keyframes: {
        floatPulse: {
          "0%, 100%": { transform: "translateY(0)", boxShadow: "0 0 0 rgba(46, 74, 35, 0.18)" },
          "50%": { transform: "translateY(-4px)", boxShadow: "0 0 20px rgba(46, 74, 35, 0.35)" },
        },
      },
    },
  },
  plugins: [],
};
