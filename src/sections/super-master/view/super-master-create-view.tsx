import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import SuperMasterNewEditForm from '../super-master-new-edit-form';

// ----------------------------------------------------------------------

export default function SuperMasterCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Super Master"
        links={[
          {
            name: 'Admin',
            href: paths.dashboard.root,
          },
          {
            name: 'Super Master',
            href: paths.dashboard.user.root,
          },
          { name: 'New Super Master' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SuperMasterNewEditForm isView={false} />
    </Container>
  );
}
