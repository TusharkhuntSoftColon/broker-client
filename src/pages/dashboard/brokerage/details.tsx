import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BrokerageDetailsView } from 'src/sections/brokerage/view';

// ----------------------------------------------------------------------

export default function BrokerageDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title>1stock Admin</title>
      </Helmet>

      <BrokerageDetailsView id={`${id}`} />
    </>
  );
}
