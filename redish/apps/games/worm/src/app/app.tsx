import { RedishButton } from '@redish-frontend/shared-ui';
import styles from './app.module.scss';
import { WormAppProps as AppProps } from '@redish-frontend/shared-models';
import { WormFeature } from '@redish-games/worm-feature';

export function App(appProps: AppProps) {
  const test = appProps.test ?? 'heinrich';
  const handleTest =
    appProps.handleTest ?? ((test: string) => console.log(test));

  return (
    <div className={styles.container}>
      <WormFeature />
      <RedishButton onClick={() => handleTest('go')}>Go</RedishButton>
    </div>
  );
}

export default App;
