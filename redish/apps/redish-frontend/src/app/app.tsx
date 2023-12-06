import { Suspense } from 'react';
import Routes from '../routes/routes';
import { AuthProvider } from '@redish-frontend/authentication-api';
import { RedishLoading } from '@redish-frontend/shared-ui';

export function App() {
  return (
    <Suspense fallback={<RedishLoading/>}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
