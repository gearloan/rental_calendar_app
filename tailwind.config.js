module.exports = {
  content: [
    './app/views/**/*.{html,erb,haml,slim}',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        'cool-sage': '#819b99',
        'cool-sage-100': '#d3dddc',
        'cool-sage-700': '#5a706f',
        'cool-sage-hover': '#6e8886',
        'cool-sage-accent': '#a3b6b4',
      },
      fontFamily: {
        //sans: ['Barlow', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif']
      }
    }
  },
  plugins: [],
}
