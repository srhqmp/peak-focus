import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        pomodoro: '#ba4949',
        shortbreak: '#38858a',
        longbreak: '#397097',
        foreground: '#ffffff',
        accent: '#C15C5C',
      },
    },
  },
  safelist: [
    'bg-pomodoro',
    'bg-shortbreak',
    'bg-longbreak',
    'text-pomodoro',
    'text-shortbreak',
    'text-longbreak',
  ],
  plugins: [],
};
export default config;
