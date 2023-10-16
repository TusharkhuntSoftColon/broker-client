import { Helmet } from 'react-helmet-async';

import { ExchangeCreateView } from 'src/sections/exchange/view';

// ----------------------------------------------------------------------

export default function ExchangeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new exchange</title>
      </Helmet>

      <ExchangeCreateView />
    </>
  );
}
