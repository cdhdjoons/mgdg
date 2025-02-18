/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        mainRed: 'rgb(160, 0, 0, 0.8)',
        footerBg: 'rgb(0, 0, 0, 0.5)',
      },
      fontFamily: {
        franklin: ["var(--font-franklin-gothic)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
