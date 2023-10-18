import { Helmet } from 'react-helmet-async';

import { SymbolListView } from 'src/sections/symbol/view';

// ----------------------------------------------------------------------

export default function OrderListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Symbol List</title>
      </Helmet>

      <SymbolListView />
    </>
  );
}
