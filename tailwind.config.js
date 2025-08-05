module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ibox-primary": "#0071E3",
        "ibox-bg": "#F8F8F8",
        "ibox-dark": "#1D1D1F",
        "ibox-gray": "#EAEAEA",
      },
      fontFamily: {
        sans: ["SF Pro Display", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
