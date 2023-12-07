import styles from './app.module.scss';
import { GameProps as AppProps } from '@redish-frontend/shared-models';
import { WormFeature } from '@redish-games/worm-feature';
import { Result } from '@redish-shared/domain';

export function App(appProps: Readonly<AppProps>) {
  const username = appProps.username ?? 'test';
  const verify =
    appProps.verify ?? ((_: string) => Promise.resolve(Result.success(true)));
  const toast =
    appProps.toast ??
    ((text: string, type: 'error' | 'info') => {
      console.log(text);
    });

  return (
    <div className={styles.container}>
      <WormFeature username={username} verify={verify} toast={toast} />
    </div>
  );
}

export default App;
