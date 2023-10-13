import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'redish-frontend',
  remotes: ['games-worm'],
};

export default config;
