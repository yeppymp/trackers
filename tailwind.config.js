module.exports = {
  purge: {
    enabled: true,
    content: [
      "./src/client/*.tsx",
      "./src/client/pages/*.tsx",
      "./src/client/components/*.tsx",
      "./src/client/components/**/*.tsx",
      "./src/client/components/**/**/*.tsx",
      "./public/index.html",
    ],
  },
  darkMode: false, // or "media" or "class"
  theme: {
    colors: {
      "black": "#000000",
      "white": "#FFFFFF",
      "primary": "#f00707",
      "danger": "#AD3232",
      info: {
        DEFAULT: "#297CC6",
        light: "#F2F7FF",
      },
      warning: {
        DEFAULT: "#FFFCD9",
      },
      success: {
        DEFAULT: "#4DA501",
        light: "#EDF6E5",
      },
      gray: {
        DEFAULT: "#DFE4E8",
        light: "#F9FAFC",
      },
    },
    gradientColorStops: theme => ({
      ...theme('colors'),
    }),
    backgroundColor: theme => ({
      ...theme('colors'),
      "default": "#F2F5F8",
      "blue": "#297CC6",
      "tertiary": "#BEC8D1",
    }),
    borderColor: theme => ({
      ...theme('colors'),
      DEFAULT: "#F2F5F8",
      "tertiary": "#BEC8D1",
    }),
    boxShadow: {
      DEFAULT: "0px 0px 4px rgba(0, 0, 0, 0.1)",
      md: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      "b-md": "0px 4px 4px rgb(0, 0, 0, 0.05)",
    },
    textColor: theme => ({
      ...theme('colors'),
      "default": "#333333",
      "secondary": "#959DA3",
      "tertiary": "#BEC8D1",
    }),
    extend: {
      dropShadow: {
        DEFAULT: "0px 0px 12px rgba(0, 0, 0, 0.1)",
        xs: "0px 1px 1px rgba(0, 0, 0, 0.1)",
      },
      outline: {
        primary: '1px solid #f00707',
      },
    },
  },
}
