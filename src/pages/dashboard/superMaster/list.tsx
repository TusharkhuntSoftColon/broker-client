import { Helmet } from 'react-helmet-async';
import { SuperMasterListView } from 'src/sections/super-master/view';

// ----------------------------------------------------------------------

export default function SuperMasterListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Super Master List</title>
      </Helmet>

      <SuperMasterListView />
    </>
  );
}
