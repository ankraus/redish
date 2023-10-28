import * as React from 'react';
import { AuthProvider } from '@redish-frontend/authentication-feature';
import Routes from '../routes/routes';

export function App() {
  return (
    <React.Suspense fallback={null}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </React.Suspense>
  );
}

export default App;
