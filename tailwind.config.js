/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/tools/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Theme background variations
        'theme': {
          'darkest': 'var(--theme-darkest)',
          'darker': 'var(--theme-darker)',
          'dark': 'var(--theme-dark)',
          'light': 'var(--theme-light)',
          'lighter': 'var(--theme-lighter)',
        },
        
        // Component-specific backgrounds
        'component': {
          'card': 'var(--component-card)',
          'sidebar': 'var(--component-sidebar)',
          'summary': 'var(--component-summary)',
          'panel': 'var(--component-panel)',
        },
        
        // Border colors for glass effect
        'border': {
          'dark': 'var(--border-dark)',
          'light': 'var(--border-light)',
        },
        
        // Special game colors
        'game': {
          'gold': 'var(--gold)',
          'gold-dark': 'var(--gold-dark)',
          'platinum': 'var(--platinum)',
          'platinum-dark': 'var(--platinum-dark)',
          'highlight': 'var(--highlight)',
        },
        
        // Stat category colors
        'stat': {
          'offensive': {
            DEFAULT: 'var(--stat-offensive)',
            'bg': 'var(--stat-offensive-bg)',
            'border': 'var(--stat-offensive-border)',
          },
          'defensive': {
            DEFAULT: 'var(--stat-defensive)',
            'bg': 'var(--stat-defensive-bg)',
            'border': 'var(--stat-defensive-border)',
          },
          'utility': {
            DEFAULT: 'var(--stat-utility)',
            'bg': 'var(--stat-utility-bg)',
            'border': 'var(--stat-utility-border)',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class', // Use 'class' instead of 'media' for manual dark mode toggling
  plugins: [
    require('@tailwindcss/typography'),
  ],
}