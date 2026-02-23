/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        phone: { max: "767px" },
        tablet: { min: "768px", max: "1023px" },
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
        rotateDown: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        rotateUp: {
          "0%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "spin-clockwise": "spin 1s linear infinite",
        slideUp: "slideUp 0.5s ease-in-out",
        slideDown: "slideDown 0.5s ease-in-out",
        rotateDown: "rotateDown 2s ease-in-out",
        rotateUp: "rotateUp 2s ease-in-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      colors: {
        putihLight: "#fffefe",
        putihLightHover: "#fffefe",
        putihLightActive: "#fffdfd",
        putihNormal: "#fff9f9",
        putihNormalHover: "#e6e0e0",
        putihNormalActive: "#ccc7c7",
        putihDark: "#bfbbbb",
        putihDarkHover: "#999595",
        putihDarkActive: "#737070",
        putihDarker: "#595757",

        hitamLight: "#e6e6e6",
        hitamLightHover: "#d9d9d9",
        hitamLightActive: "#b0b0b0",
        hitamNormal: "#000000",
        hitamNormalHover: "#000000",
        hitamNormalActive: "#000000",
        hitamDark: "#000000",
        hitamDarkHover: "#000000",
        hitamDarkActive: "#000000",
        hitamDarker: "#000000",

        hijauLight: "#e7f0ed",
        hijauLightHover: "#dae8e4",
        hijauLightActive: "#b3cfc7",
        hijauNormal: "#0b654a",
        hijauNormalHover: "#0a5b43",
        hijauNormalActive: "#09513b",
        hijauDark: "#084c38",
        hijauDarkHover: "#073d2c",
        hijauDarkActive: "#052d21",
        hijauDarker: "#04231a",

        kuningLight: "#fffaea",
        kuningLightHover: "#fff8df",
        kuningLightActive: "#fef0bd",
        kuningNormalBaru: "#FDC916",
        kuningNormal: "#fdcf2b",
        kuningNormalHover: "#e4ba27",
        kuningNormalActive: "#caa622",
        kuningDark: "#be9b20",
        kuningDarkHover: "#987c1a",
        kuningDarkActive: "#725d13",
        kuningDarker: "#59480f",

        merahLight: "#fdecec",
        merahLightHover: "#fce3e2",
        merahLightActive: "#f9c5c3",
        merahNormal: "#ec453f",
        merahNormalHover: "#d43e39",
        merahNormalActive: "#bd3732",
        merahDark: "#b1342f",
        merahDarkHover: "#8e2926",
        merahDarkActive: "#6a1f1c",
        merahDarker: "#531816",
      },
      fontFamily: {
        sans: ["Outfit"],
      },
    },
  },
  variants: {},
  plugins: [],
};
