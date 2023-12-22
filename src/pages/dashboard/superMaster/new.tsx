import { Helmet } from 'react-helmet-async';
import { SuperMasterCreateView } from 'src/sections/super-master/view';

// ----------------------------------------------------------------------

export default function SuperMasterCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Super Master</title>
      </Helmet>

      <SuperMasterCreateView />
    </>
  );
}
