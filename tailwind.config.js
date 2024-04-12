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
          '50': '#dde8fc',
          '100': '#c2d7fb',
          '200': '#98bff8',
          '300': '#689df2',
          '400': '#4579ec',
          '500': '#2a57e0',
          '600': '#2748ce',
          '700': '#253ba8',
          '800': '#243784',
          '900': '#1a2351',
        },
      },
    },
  },
  plugins: [],
};
