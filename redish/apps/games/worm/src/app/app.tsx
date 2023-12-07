import styles from './app.module.scss';
import { WormAppProps as AppProps } from '@redish-frontend/shared-models';
import { WormFeature } from '@redish-games/worm-feature';
import { ToastContainer } from 'react-toastify';

export function App(appProps: Readonly<AppProps>) {
  const username = appProps.username ?? 'test';

  return (
    <div className={styles.container}>
      <WormFeature username={username} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
