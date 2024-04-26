import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import defaultTheme from './themes/default/index.tsx';
import { registerSW } from 'virtual:pwa-register';

const updateServiceWorkers = registerSW({
  onNeedRefresh() {
    if (confirm('New Content Available. Reload?')) {
      updateServiceWorkers(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
