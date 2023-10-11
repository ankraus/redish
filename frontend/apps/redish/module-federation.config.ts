import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'redish',
  remotes: ['games-worm'],
};

export default config;
