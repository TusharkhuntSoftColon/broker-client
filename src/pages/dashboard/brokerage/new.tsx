import { Helmet } from 'react-helmet-async';

import { BrokerageCreateView } from 'src/sections/brokerage/view';

// ----------------------------------------------------------------------

export default function BrokerageCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new user</title>
      </Helmet>

      <BrokerageCreateView />
    </>
  );
}
