import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';
import { store, persistor } from './store';
import addAuthTokenInterceptor from './lib/addAuthTokenInterceptor';

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
