import { Helmet } from 'react-helmet-async';

import { BrokerageListView } from 'src/sections/brokerage/view';

// ----------------------------------------------------------------------

export default function BrokeragePage({ currentUser, fields }: any) {
  return (
    <>
      <Helmet>
        <title> Dashboard: Brokerage</title>
      </Helmet>

      <BrokerageListView fields={fields} currentUser={currentUser} />
    </>
  );
}
