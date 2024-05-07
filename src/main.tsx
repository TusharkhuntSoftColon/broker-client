/* eslint-disable import/no-cycle */
/* eslint-disable no-lonely-if */
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from 'src/app';

import { store, persistor } from './store';
import addAuthTokenInterceptor from './lib/addAuthTokenInterceptor';

// Create a client
const queryClient = new QueryClient();

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'F11') {
    toggleFullScreen();
    const localFullScreen = localStorage.getItem('isFullScreen') === 'true';
    localStorage.setItem('isFullScreen', String(!localFullScreen));
  }
  if (
    (event.key === 'f' && event.metaKey && event.ctrlKey) ||
    (event.ctrlKey && event.key === 'F')
  ) {
    toggleFullScreen();
    const localFullScreen = localStorage.getItem('isFullScreen') === 'true';
    localStorage.setItem('isFullScreen', String(!localFullScreen));
  }
};

export const toggleFullScreen = () => {
  const isFullScreen = document.fullscreenElement !== null;
  if (!isFullScreen) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
};

// ----------------------------------------------------------------------
addAuthTokenInterceptor(store);
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StoreProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </PersistGate>
  </StoreProvider>
);

document.addEventListener('keydown', handleKeyDown);
