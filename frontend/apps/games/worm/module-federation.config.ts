import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'worm',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
