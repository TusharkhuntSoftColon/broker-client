import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExchangeNewEditForm from '../exchange-new-edit-form';


// ----------------------------------------------------------------------

export default function ExchangeCreateView() {
  const settings = useSettingsContext();

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
            name: 'Product',
            href: paths.dashboard.exchange.root,
          },
          { name: 'New product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExchangeNewEditForm />
    </Container>
  );
}
