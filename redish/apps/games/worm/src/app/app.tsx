import styles from './app.module.scss';
import { WormAppProps as AppProps } from '@redish-frontend/shared-models';
import { WormFeature } from '@redish-games/worm-feature';

export function App(appProps: Readonly<AppProps>) {
  const username = appProps.username ?? 'test';

  return (
    <div className={styles.container}>
      <WormFeature username={username} />
    </div>
  );
}

export default App;
