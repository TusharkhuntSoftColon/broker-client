import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import OrderNewEditForm from '../order-new-edit-form';
import { _symbolList } from 'src/_mock';

// ----------------------------------------------------------------------

export default function OrderEditView({ id }: { id: any }) {
  const settings = useSettingsContext();

  const currentUser = _symbolList.find((user) => user.id === id);

  console.log({ currentUser });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new product"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Symbol',
            href: paths.dashboard.symbol.root,
          },
          { name: 'New Symbol' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        isView={true}
      />

      <OrderNewEditForm currentUser={currentUser} />
    </Container>
  );
}
