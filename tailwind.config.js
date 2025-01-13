/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(116deg, #141E30 1.6%, #28416F 67.41%, #48618E 96.1%)',
        'custom-gradient-alt': 'linear-gradient(244deg, #FB106D 1.82%, #FC1529 67.22%, #FB741A 95.73%)',
      },
    },
  },
  plugins: [],
};
