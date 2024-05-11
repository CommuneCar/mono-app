import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import { registerSW } from 'virtual:pwa-register';

import './index.css';

import { App } from './App.tsx';
import defaultTheme from './themes/default/index.tsx';

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
