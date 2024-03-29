/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@mbicycle/foundation-ui-kit/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'blue': {
          '50': '#f0f5fe',
          '100': '#dde8fc',
          '200': '#c2d7fb',
          '300': '#98bff8',
          '400': '#689df2',
          '500': '#4579ec',
          '600': '#2a57e0',
          '700': '#2748ce',
          '800': '#253ba8',
          '900': '#243784',
          '950': '#1a2351',
        },
      },
    },
  },
  plugins: [],
};
