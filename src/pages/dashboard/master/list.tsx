import { Helmet } from 'react-helmet-async';
import MasterListView from './../../../sections/master/view/master-list-view';

// ----------------------------------------------------------------------

export default function MasterListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Master List</title>
      </Helmet>

      <MasterListView />
    </>
  );
}
