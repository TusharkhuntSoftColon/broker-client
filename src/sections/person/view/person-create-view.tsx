import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import PersonNewEditForm from '../person-new-edit-form';

// ----------------------------------------------------------------------

export default function PersonCreateView() {
  const settings = useSettingsContext();

  const role = useSelector((data: any) => data.auth.role);
  // const path = paths.dashboard;

  const getPath = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return paths.dashboard.person;
      case 'SUPER MASTER':
        return paths.superMaster.person;
      // Add other cases for different roles with their respective paths
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new Person"
        links={[
          {
            name: 'Admin',
            href: paths.dashboard.root,
          },
          {
            name: 'Person',
            href: paths.dashboard.user.root,
          },
          { name: 'New Person' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PersonNewEditForm isView={false} path={getPath('SUPER MASTER')} />
    </Container>
  );
}
