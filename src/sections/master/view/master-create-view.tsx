import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import MasterNewEditForm from '../master-new-edit-form';

// ----------------------------------------------------------------------

export default function MasterCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Master"
        links={[
          {
            name: 'Admin',
            href: paths.dashboard.root,
          },
          {
            name: 'Master',
            href: paths.dashboard.user.root,
          },
          { name: 'New Master' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <MasterNewEditForm isView={false} />
    </Container>
  );
}
