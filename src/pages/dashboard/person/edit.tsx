import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { PersonEditView } from 'src/sections/person/view';

// ----------------------------------------------------------------------

export default function PersonEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Master Edit</title>
      </Helmet>

      <PersonEditView />
    </>
  );
}
