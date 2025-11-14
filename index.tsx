
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Fix: Import AuthProvider to make it available.
import { AuthProvider } from './hooks/useAuth';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* Fix: Wrap App with AuthProvider to provide authentication context. */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);