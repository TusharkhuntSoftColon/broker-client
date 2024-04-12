import { Helmet } from 'react-helmet-async';

import { PersonCreateView } from 'src/sections/person/view';

// ----------------------------------------------------------------------

export default function PersonCreatePage() {
  return (
    <>
      <Helmet>
        <title>1stock Admin</title>
      </Helmet>

      <PersonCreateView />
    </>
  );
}
