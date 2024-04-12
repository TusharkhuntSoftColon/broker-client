import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { BrokerageEditView } from 'src/sections/brokerage/view';

// ----------------------------------------------------------------------

export default function BrokerageEditPage() {
  const params = useParams();

  const { id } = params;
  // const { tenetId } = params;

  return (
    <>
      <Helmet>
        <title>1stock Admin</title>
      </Helmet>

      <BrokerageEditView id={`${id}`} />
    </>
  );
}
