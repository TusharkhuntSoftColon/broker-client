import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function PersonDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Master Detail</title>
      </Helmet>

      {/* <PersonDetailsView id={`${id}`} /> */}
    </>
  );
}
