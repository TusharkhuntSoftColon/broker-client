import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';
import SymbolEditView from 'src/sections/symbol/view/symbol-edit-view';

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

      <SymbolEditView id={`${id}`} />
    </>
  );
}
