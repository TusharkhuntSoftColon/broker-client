import { Helmet } from 'react-helmet-async';

import { BrokerageListView } from 'src/sections/brokerage/view';

// ----------------------------------------------------------------------

export default function BrokeragePage({ currentUser }: any) {
  return (
    <>
      <Helmet>
        <title> Dashboard: Brokerage</title>
      </Helmet>

      <BrokerageListView currentUser={currentUser} />
    </>
  );
}
