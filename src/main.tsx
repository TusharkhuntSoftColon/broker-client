import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app';
import { store } from './store';

// Create a client
const queryClient = new QueryClient();

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StoreProvider store={store}>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StoreProvider>
);
