const { composePlugins, withNx } = require('@nx/webpack');
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  config.resolve = {
    extensions: ['.ts', '.js', '.mjs', '.js', '.svelte'],
    alias: {
      svelte: path.resolve('node_modules', 'svelte/src/runtime'), // Svelte 3: path.resolve('node_modules', 'svelte')
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
    conditionNames: ['svelte', 'browser', 'import'],
  };

  console.log('aaa', config);
  config.module.rules = config.module.rules.filter(
    (x) => x.test == /\.([jt])sx?$/
  );
  config.module.rules.push(
    {
      test: /\.(html|svelte)$/,
      use: {
        loader: 'svelte-loader',
        options: {
          preprocess: sveltePreprocess(),
        },
      },
    },
    {
      // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
      test: /node_modules\/svelte\/.*\.mjs$/,
      resolve: {
        fullySpecified: false,
      },
    }
  );

  return config;
});
