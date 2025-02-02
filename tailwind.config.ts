import svgToDataUri from 'mini-svg-data-uri';
import type { Config } from 'tailwindcss';
// eslint-disable-next-line import/no-named-default
import { default as flattenColorPalette } from 'tailwindcss/lib/util/flattenColorPalette';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        title: {
          DEFAULT: 'var(--title)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ddd: {
          DEFAULT: 'var(--ddd)',
        },
        gray: {
          light: 'var(--color-gray-light)',
          dark: 'var(--color-gray-dark)',
        },
        brown: {
          light: 'var(--color-brown-light)',
          dark: 'var(--color-brown-dark)',
        },
        orange: {
          light: 'var(--color-orange-light)',
          dark: 'var(--color-orange-dark)',
        },
        yellow: {
          light: 'var(--color-yellow-light)',
          dark: 'var(--color-yellow-dark)',
        },
        green: {
          light: 'var(--color-green-light)',
          dark: 'var(--color-green-dark)',
        },
        blue: {
          light: 'var(--color-blue-light)',
          dark: 'var(--color-blue-dark)',
        },
        purple: {
          light: 'var(--color-purple-light)',
          dark: 'var(--color-purple-dark)',
        },
        pink: {
          light: 'var(--color-pink-light)',
          dark: 'var(--color-pink-dark)',
        },
        red: {
          light: 'var(--color-red-light)',
          dark: 'var(--color-red-dark)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 1px)',
        sm: 'calc(var(--radius) - 2px)',
      },
      fontFamily: {
        sans: ['var(--font-mali)'],
      },
    },
  },
  plugins: [
    // eslint-disable-next-line ts/no-require-imports
    require('tailwindcss-animate'),
    addVariablesForColors,
    function ({ matchUtilities, theme }: any) {
      matchUtilities(
        {
          'bg-dot-thick': (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme('backgroundColor')),
          type: 'color',
        },
      );
    },
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ':root': newVars,
  });
}

export default config;
