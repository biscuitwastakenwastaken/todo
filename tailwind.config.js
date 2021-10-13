module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        successGreen: "#9CE27C",
        warningYellow: "#E0E27C",
        negativeRed: "#E27C7C",
        disabledGrey: "#ABABAB",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
