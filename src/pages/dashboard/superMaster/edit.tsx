import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import SuperMasterEditView from 'src/sections/super-master/user/view/super-master-edit-view';

// ----------------------------------------------------------------------

export default function SuperMasterEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Super Master Edit</title>
      </Helmet>

      <SuperMasterEditView id={`${id}`} />
    </>
  );
}
