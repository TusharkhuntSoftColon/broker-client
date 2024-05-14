/* eslint-disable import/no-cycle */
import { Helmet } from 'react-helmet-async';

import { OverviewAppView } from 'src/sections/overview/app/view';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title>1stock Admin</title>
      </Helmet>

      <OverviewAppView />
    </>
  );
}
