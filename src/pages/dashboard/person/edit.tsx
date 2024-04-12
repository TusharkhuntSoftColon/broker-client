import { Helmet } from 'react-helmet-async';

import { PersonEditView } from 'src/sections/person/view';

// ----------------------------------------------------------------------

export default function PersonEditPage() {
  // const params = useParams();

  // const { id } = params;

  return (
    <>
      <Helmet>
        <title>1stock Admin</title>
      </Helmet>

      <PersonEditView />
    </>
  );
}
