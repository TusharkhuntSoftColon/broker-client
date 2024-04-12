import { Helmet } from 'react-helmet-async';

import { BrokerageCreateView } from 'src/sections/brokerage/view';

// ----------------------------------------------------------------------

export default function BrokerageCreatePage() {
  return (
    <>
      <Helmet>
        <title>1stock Admin</title>
      </Helmet>

      <BrokerageCreateView />
    </>
  );
}
