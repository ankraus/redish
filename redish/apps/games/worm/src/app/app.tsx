// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RedishButton } from '@redish-frontend/shared-ui';
import styles from './app.module.scss';

import NxWelcome from './nx-welcome';

interface AppProps {
  test?: string;
  handleTest?: (test: string) => void;
}

export function App(appProps: AppProps) {
  const test = appProps.test ?? 'heinrich';
  const handleTest =
    appProps.handleTest ?? ((test: string) => console.log(test));

  return (
    <div className={styles.container}>
      <NxWelcome title={test} />
      <RedishButton onClick={() => handleTest('go')}>Go</RedishButton>
    </div>
  );
}

export default App;
