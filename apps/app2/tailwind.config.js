const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const sharedTailwindConfig = require('../../tailwind.shared.config');

module.exports = {
  mode: 'jit',
  purge: [
    './apps/app2/src/**/*.{html,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    ...sharedTailwindConfig.theme,
    extend: {
      ...sharedTailwindConfig.theme.extend,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
