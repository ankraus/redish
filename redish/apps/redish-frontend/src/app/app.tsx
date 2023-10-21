import * as React from 'react';

import NxWelcome from './nx-welcome';

import { Link, Route, Routes } from 'react-router-dom';
import { RedishHeader } from '@redish-frontend/shared-ui';
import { AuthenticationFeature } from '@redish-frontend/authentication-feature';

const Worm = React.lazy(() => import('games-worm/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <RedishHeader />
      <ul>
        <li>
          <Link to="/">Home</Link>
          <Link to="/worm">Worm</Link>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<NxWelcome title="redish" />} />
        <Route path="/worm" element={<Worm />} />
        <Route path="/login" element={<AuthenticationFeature />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
