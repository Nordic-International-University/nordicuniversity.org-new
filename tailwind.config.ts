import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#032E63",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90.71deg, #46658B -22.74%, #0B3C79 118.95%)",
      },
    },
  },
  plugins: [],
};
export default config;
