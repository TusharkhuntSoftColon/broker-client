import { Helmet } from 'react-helmet-async';

import { ExchangeListView } from 'src/sections/exchange/view';

// ----------------------------------------------------------------------

export default function ExchangeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Exchange List</title>
      </Helmet>

      <ExchangeListView />
    </>
  );
}
