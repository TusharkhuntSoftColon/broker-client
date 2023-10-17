import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import OrderEditView from 'src/sections/order/view/order-edit-view';

import { UserEditView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function OrderEditPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Admin Edit</title>
      </Helmet>

      <OrderEditView id={`${id}`} />
    </>
  );
}
