import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { SymbolDetailsView } from 'src/sections/symbol/view';

// ----------------------------------------------------------------------

export default function OrderDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Order Details</title>
      </Helmet>

      <SymbolDetailsView id={`${id}`} />
    </>
  );
}
