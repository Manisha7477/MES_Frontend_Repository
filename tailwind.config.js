/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {},
    extend: {
      screens: { xs: "480px" },
    },
    transitionDuration: {
      DEFAULT: "250ms",
    },
    colors: {
      darkBlue: "#1A619E",
      background: "#edfcff", // Replace with your desired dark blue shade
    },
  },
  variants: {
    // backgroundColor: ["active"],
    extend: {
      backgroundColor: ["active"],
    },
  },

  // daisyUI config (optional - here are the default values)
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          primary: "#0084A1",
          "primary-content": "#71CBE0",
          secondary: "#FFED66",
          accent: "#C3DEC9",
          neutral: "#F0FBFD",
          "base-100": "#ffffff",
          "base-200": "#e5e7eb",
          "base-300": "#d1d5db",
          info: "#B6E0EA",
          success: "#22B843",
          warning: "#FABA17",
          error: "#E54D4D",
        },
      },
      {
        // For Dark Mode
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          // primary: "#4F46E5",
          primary: "#4682B4",
          "primary-content": "#D1D5DB",
          secondary: "#818CF8",
          accent: "#A78BFA",
          neutral: "#374151",
          "base-100": "#1F2937",
          "base-200": "#111827",
          "base-300": "#1C1F24",
          // info: "#60A5FA",
          info: "#4682B4",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },

  plugins: [require("daisyui")],
}
