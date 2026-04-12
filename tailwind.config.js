module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#1DA5A6",
        secondary: "#194774",
        accent: "#FFC83D",
      },
    },
  },
   keyframes: {
    "scale-in": {
      "0%": { transform: "scale(0.9)", opacity: "0" },
      "100%": { transform: "scale(1)", opacity: "1" },
    },
    "slide-up": {
      "0%": { transform: "translateY(20px)", opacity: "0" },
      "100%": { transform: "translateY(0)", opacity: "1" },
    },
  },
  animation: {
    "scale-in": "scale-in 0.5s ease-out",
    "slide-up": "slide-up 0.4s ease-out",
  },
};
