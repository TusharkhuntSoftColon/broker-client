import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import MasterDetailsView from './../../../sections/master/view/master-details-view';

// ----------------------------------------------------------------------

export default function MasterDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Master Detail</title>
      </Helmet>

      <MasterDetailsView id={`${id}`} />
    </>
  );
}
