import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './app';
import addAuthTokenInterceptor from './lib/addAuthTokenInterceptor';
import { persistor, store } from './store';

// Create a client
const queryClient = new QueryClient();

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
