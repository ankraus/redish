// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import NxWelcome from './nx-welcome';
import { RedishHeader } from '@frontend/redish-ui';

export function App() {
  return (
    <div>
      <RedishHeader />
      <NxWelcome title="redish" />
    </div>
  );
}

export default App;
