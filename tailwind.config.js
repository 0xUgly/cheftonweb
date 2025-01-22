const { title } = require('process');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        title:["Staatliches", "sans-serif"],
        zk :["Epilogue", "sans-serif" ],
        baloo :["Baloo Da 2", 'sans-serif'],
      }
    },
  },
  plugins: [],
}

