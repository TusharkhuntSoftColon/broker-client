import Container from '@mui/material/Container';

import { paths } from '../../../routes/paths';
import BrokerageNewEditForm from '../brokerage-new-edit-form';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';


// ----------------------------------------------------------------------

export default function BrokerageCreateView() {
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
            href: paths.dashboard.exchange.root,
          },
          { name: 'New Exchange' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        
      />

      <BrokerageNewEditForm />
    </Container>
  );
}
