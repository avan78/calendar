import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */

export default <Config>{
  content: ['index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  /* corePlugins: {
    preflight: false,
  },*/
  plugins: [],
};
