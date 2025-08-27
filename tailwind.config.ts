import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        secondary: "#0b4075",
        text_secondary: "#0b4075",
        text_primary: "#fff",
        text_tertiary: "rgba(219, 242, 255, 1)",
        tertiary: "#364E6B",
        box_color: "#DBF2FF",
        dark_blue_color: "rgba(3, 46, 99, 1)",
        brodCrumbColor: "#003161",
        anyColor: "#0C3169",
        nav_opacity: "rgba(39, 41, 69, 0.5)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(90.71deg, #46658B -22.74%, #0B3C79 118.95%)",
        "secondary-gradient":
          "linear-gradient(115.34deg, #46658B -1.3%, #7A98C1 111.45%)",
        "diamond-gradient":
          "radial-gradient(98.59% 204.87% at 0% 3%, #5A708E 0%, #5A708E 25%, #5A708E 51.4%, rgba(90, 112, 142, 0.7) 78%, rgba(90, 112, 142, 0.8) 100%)",
        footer_gradient:
          "linear-gradient(109.27deg, #0B3C79 -8.04%, #295182 43.23%, #46658B 107.31%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
