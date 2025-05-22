module.exports = {
  content: [
    './app/views/**/*.{html,erb,haml,slim}',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'ice-blue': '#e3f3f8',
        'cool-sage': '#819b99',
        'cool-sage-25': '#f6faf9',
        'cool-sage-100': '#d3dddc',
        'cool-sage-700': '#5a706f',
        'cool-sage-hover': '#6e8886',
        'cool-sage-accent': '#a3b6b4',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        barlow: ['Barlow', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
