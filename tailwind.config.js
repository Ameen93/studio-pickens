/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'studio-bg': '#F8F7F7',
        'studio-blue': '#0025B8',
        'studio-orange': '#FF7E46',
        'nav-blue': '#08249F',
        'nav-orange': '#FF7E46',
      },
      fontFamily: {
        'proxima': ['proxima-nova', 'sans-serif'],
        'proxima-wide': ['proxima-nova-extra-wide', 'sans-serif'],
      },
      fontSize: {
        // Headings - Desktop
        'h1': ['80px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '600' }],
        'h2': ['64px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '600' }],
        'h3': ['48px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '600' }],
        
        // Headings - Mobile
        'h1-mobile': ['40px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '500' }],
        'h2-mobile': ['32px', { lineHeight: '110%', letterSpacing: '-0.03em', fontWeight: '500' }],
        'h3-mobile': ['24px', { lineHeight: '120%', letterSpacing: '-0.02em', fontWeight: '500' }],
        
        // Atelier Wigs Mobile Specific
        'atelier-heading-mobile': ['30px', { lineHeight: '107%', letterSpacing: '0.03em', fontWeight: '700' }],
        'atelier-body-mobile': ['16px', { lineHeight: '125%', letterSpacing: '0.01em', fontWeight: '400' }],
        
        // Subheadings - Desktop
        'sub-lg': ['24px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        'sub': ['16px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        
        // Subheadings - Mobile
        'sub-lg-mobile': ['20px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        'sub-mobile': ['14px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        
        // Body Text - Desktop
        'body-lg': ['16px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'body': ['14px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '130%', letterSpacing: '0.02em', fontWeight: '400' }],
        
        // Body Text - Mobile
        'body-lg-mobile': ['14px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'body-mobile': ['12px', { lineHeight: '130%', letterSpacing: '-0.02em', fontWeight: '400' }],
        'small-mobile': ['10px', { lineHeight: '130%', letterSpacing: '0.02em', fontWeight: '400' }],
        
        // Buttons & Tags
        'button': ['13px', { lineHeight: '100%', letterSpacing: '0.04em', fontWeight: '500' }],
        'button-link': ['14px', { lineHeight: '100%', letterSpacing: '0em', fontWeight: '500' }],
        'atelier-link-mobile': ['16px', { lineHeight: '125%', letterSpacing: '0.01em', fontWeight: '400' }],
        'tag': ['12px', { lineHeight: '100%', letterSpacing: '0.06em', fontWeight: '500' }],
        
        // Navbar
        'nav': ['14px', { lineHeight: '150%', letterSpacing: '0.03em', fontWeight: '700' }],
        'nav-logo': ['27px', { lineHeight: '150%', letterSpacing: '0.03em', fontWeight: '700' }],
      },
      letterSpacing: {
        'tight-3': '-0.03em',
        'tight-2': '-0.02em',
        'wide-2': '0.02em',
        'wide-3': '0.03em',
        'wide-4': '0.04em',
        'wide-6': '0.06em',
      },
      spacing: {
        '2': '8px',    // 8px
        '4': '16px',   // 16px
        '6': '24px',   // 24px
        '8': '32px',   // 32px
        '10': '40px',  // 40px
        '12': '48px',  // 48px
        '14': '56px',  // 56px
        '16': '64px',  // 64px
        '20': '80px',  // 80px
        '24': '96px',  // 96px
        '28': '112px', // 112px
        '32': '128px', // 128px
        '36': '144px', // 144px
        '40': '160px', // 160px
        '44': '176px', // 176px
        '48': '192px', // 192px
        '52': '208px', // 208px
        '56': '224px', // 224px
        '60': '240px', // 240px
        '64': '256px', // 256px
      },
    },
  },
  plugins: [],
}