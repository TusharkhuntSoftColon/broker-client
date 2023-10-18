import { Helmet } from 'react-helmet-async';
import OrderCreateView from 'src/sections/symbol/view/symbol-create-view';

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
