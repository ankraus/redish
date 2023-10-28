import { AuthProvider } from '@redish-frontend/authentication-feature';
import { Suspense } from 'react';
import Routes from '../routes/routes';

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
