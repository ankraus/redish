import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { withModuleFederation } from '@nx/react/module-federation';

import baseConfig from './module-federation.config';
import path from 'path';

const config = {
  ...baseConfig,
};

// Nx plugins for webpack to build config object from Nx options and context.
export default composePlugins(
  withNx(),
  withReact(),
  withModuleFederation(config),
  (config) => {
    config = {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          // This is a workaround to provide one global styles file for all libraries
          'global-styles': path.join(
            __dirname,
            '../../libs/redish-frontend/shared/ui/src/global.styles.scss'
          ),
        },
      },
    };
    return config;
  }
);
