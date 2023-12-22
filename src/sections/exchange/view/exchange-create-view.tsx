import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

import ExchangeNewEditForm from '../exchange-new-edit-form';

// ----------------------------------------------------------------------

export default function ExchangeCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new exchange"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Exchange',
            // href: paths.dashboard.exchange.root,
          },
          { name: 'New Exchange' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExchangeNewEditForm />
    </Container>
  );
}
