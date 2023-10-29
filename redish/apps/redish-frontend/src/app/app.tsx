import { Suspense } from 'react';
import Routes from '../routes/routes';
import { AuthProvider } from '@redish-frontend/authentication-api';

export function App() {
  return (
    <Suspense fallback={null}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
