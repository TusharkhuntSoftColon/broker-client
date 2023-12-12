import { Helmet } from 'react-helmet-async';
import { PersonCreateView } from 'src/sections/person/view';

// ----------------------------------------------------------------------

export default function PersonCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Person</title>
      </Helmet>

      <PersonCreateView />
    </>
  );
}
