const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');

module.exports = {
  mode: 'jit',
  purge: [
    './libs/lib3/**/*.{html,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
