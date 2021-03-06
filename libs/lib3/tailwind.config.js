const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');

module.exports = {
  mode: 'jit',
  purge: [
    './libs/lib3/src/**/*.{html,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'lightgreen',
          DEFAULT: 'green',
          dark: 'darkgreen',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
