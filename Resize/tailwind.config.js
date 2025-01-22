/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        text: 'var(--color-text)',
        secondary: 'var(--color-secondary)',
        dark: 'var(--color-dark)',
        darkLight: 'var(--color-dark-light)',
        border: 'var(--color-border)',
        borderLight: 'var(--color-border-light)',
        tertiary: 'var(--color-tertiary)',
      },
      transitionProperty: {
        all: 'var(--transition)',
      },
    },
  },
  plugins: [],
}

