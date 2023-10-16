import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ExchangeDetailsView } from 'src/sections/exchange/view';



// ----------------------------------------------------------------------

export default function ExchangeDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Exchange Details</title>
      </Helmet>

      <ExchangeDetailsView id={`${id}`} />
    </>
  );
}
