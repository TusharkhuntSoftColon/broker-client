import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { UserDetailsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Admins Details</title>
      </Helmet>

      <UserDetailsView id={`${id}`} />
    </>
  );
}
