import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import MasterEditView from './../../../sections/master/view/master-edit-view';

// ----------------------------------------------------------------------

export default function MasterEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Master Edit</title>
      </Helmet>

      <MasterEditView id={`${id}`} />
    </>
  );
}
