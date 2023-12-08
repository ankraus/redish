import { Suspense } from 'react';
import Routes from '../routes/routes';
import { AuthProvider } from '@redish-frontend/authentication-api';
import { RedishLoading } from '@redish-frontend/shared-ui';
import axios from 'axios';

export function App() {
  axios.defaults.withCredentials = true;
  return (
    <Suspense fallback={<RedishLoading />}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
