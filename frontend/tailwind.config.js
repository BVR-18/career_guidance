/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #0058be)',
        'primary-container': 'var(--color-primary-container, #2170e4)',
        'on-primary': 'var(--color-on-primary, #ffffff)',
        'on-primary-container': 'var(--color-on-primary-container, #001a42)',
        
        secondary: 'var(--color-secondary, #006c49)',
        'secondary-container': 'var(--color-secondary-container, #6cf8bb)',
        'on-secondary': '#ffffff',
        
        tertiary: 'var(--color-tertiary, #6b38d4)',
        'tertiary-container': 'var(--color-tertiary-container, #e9ddff)',
        
        background: 'var(--color-bg, #f8f9ff)',
        surface: 'var(--color-surface, #f8f9ff)',
        
        'surface-container-lowest': 'var(--color-surface-lowest, #ffffff)',
        'surface-container-low': 'var(--color-surface-low, #eff4ff)',
        'surface-container': 'var(--color-surface-container, #e6eeff)',
        'surface-container-high': 'var(--color-surface-high, #dee9fc)',
        'surface-container-highest': 'var(--color-surface-highest, #d9e3f6)',
        
        'on-surface': 'var(--color-on-surface, #121c2a)',
        'on-surface-variant': 'var(--color-on-surface-variant, #424754)',
        'on-background': 'var(--color-on-surface, #121c2a)',
        
        outline: 'var(--color-outline, #727785)',
        'outline-variant': 'var(--color-outline-variant, #c2c6d6)',
        
        error: '#ba1a1a',
        'error-container': '#ffdad6',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      spacing: {
        'unit-md': '16px',
        'unit-lg': '24px',
        'unit-xs': '4px',
        'unit-xl': '48px',
        'margin-mobile': '20px',
        'container-max': '1280px',
        'margin-desktop': '64px',
        'unit-sm': '8px',
        gutter: '24px',
      },
      fontFamily: {
        'body-lg': ['Inter', 'sans-serif'],
        'body-md': ['Inter', 'sans-serif'],
        'headline-xl': ['Plus Jakarta Sans', 'sans-serif'],
        'headline-lg-mobile': ['Plus Jakarta Sans', 'sans-serif'],
        'label-sm': ['Inter', 'sans-serif'],
        'headline-md': ['Plus Jakarta Sans', 'sans-serif'],
        'label-md': ['Inter', 'sans-serif'],
        'headline-lg': ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'headline-xl': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'headline-lg-mobile': ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        'label-sm': ['12px', { lineHeight: '1', fontWeight: '500' }],
        'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'label-md': ['14px', { lineHeight: '1', letterSpacing: '0.05em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
