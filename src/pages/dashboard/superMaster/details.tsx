import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import SuperMasterDetailsView from 'src/sections/super-master/user/view/super-master-details-view';

// ----------------------------------------------------------------------

export default function SuperMasterDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Super Master Detail</title>
      </Helmet>

      <SuperMasterDetailsView id={`${id}`} />
    </>
  );
}
