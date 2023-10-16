import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ExchangeEditView } from 'src/sections/exchange/view';

// ----------------------------------------------------------------------

export default function ExchangeEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Exchange Edit</title>
      </Helmet>

      <ExchangeEditView id={`${id}`} />
    </>
  );
}
