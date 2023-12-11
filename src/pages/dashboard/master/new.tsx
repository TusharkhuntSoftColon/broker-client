import { Helmet } from 'react-helmet-async';
import MasterCreateView from './../../../sections/master/view/master-create-view';

// ----------------------------------------------------------------------

export default function MasterCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Master</title>
      </Helmet>

      <MasterCreateView />
    </>
  );
}
