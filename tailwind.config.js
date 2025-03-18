/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/templates/**/*.html"],
  theme: {
    container: {
      center: true,
      padding: "20px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#006AA2",
          900: "#075985",
        },
        herobg: {
          DEFAULT: "#0F172A",
        },
      },
      fontSize: {
        sm: "12px",
        base: "14px",
        md: "16px",
      },
    },
  },
  plugins: [],
};
