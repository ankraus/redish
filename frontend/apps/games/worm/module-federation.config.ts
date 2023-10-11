import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'games-worm',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
