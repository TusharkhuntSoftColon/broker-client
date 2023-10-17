import { Helmet } from 'react-helmet-async';
import OrderCreateView from 'src/sections/order/view/order-create-view';

// ----------------------------------------------------------------------

export default function ExchangeCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Order</title>
      </Helmet>

      <OrderCreateView />
    </>
  );
}
