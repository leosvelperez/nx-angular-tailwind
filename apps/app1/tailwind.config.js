const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const sharedTailwindConfig = require('../../libs/tailwind/tailwind.config');

module.exports = {
  presets: [sharedTailwindConfig],
  mode: 'jit',
  purge: [
    './apps/app1/src/**/*.{html,ts}',
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
