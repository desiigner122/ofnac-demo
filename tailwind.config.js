/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ofnac: {
          green: {
            900: "#0A3D2E",
            800: "#114D3B",
            700: "#1B7A4D",
            50:  "#ECF3EF",
          },
          gold: {
            DEFAULT: "#D4A93C",
            soft:    "#E8C879",
          },
          cream:    "#F4F1E8",
          paper:    "#FBFAF5",
          ink:      "#1A2421",
          "ink-soft": "#4A5550",
          gray:     "#8A8F8A",
          line:     "#E5E2D8",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
