import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'redish',
  remotes: ['worm'],
};

export default config;
