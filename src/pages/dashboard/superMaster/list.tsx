import { Helmet } from 'react-helmet-async';
import SuperMasterListView from 'src/sections/super-master/user/view/super-master-list-view';

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
