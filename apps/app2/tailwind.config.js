const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const sharedTailwindConfig = require('../../libs/tailwind/tailwind.config');

module.exports = {
  mode: 'jit',
  purge: [
    './apps/app2/src/**/*.{html,ts}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // TODO: provide a utility to merge tailwind configs
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
