import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function PersonCreateView() {
  const settings = useSettingsContext();

  const role = useSelector((data: any) => data.auth.role);
  // console.log('Role in person create view : ', role);

  // const path = paths.dashboard;

  const getPath = (roleOfPerson: any) => {
    switch (roleOfPerson) {
      case 'ADMIN':
        return paths.dashboard;
      case 'SUPER_MASTER':
        return paths.superMaster;
      case 'MASTER':
        return paths.master;
      // Add other cases for different roles with their respective paths
      default:
        return paths.dashboard.person; // Return a default path if role doesn't match
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Create a new User"
        links={[
          {
            name: 'Admin',
            href: paths.dashboard.root,
          },
          {
            name: 'User',
            href: paths.dashboard.person.root,
          },
          { name: 'New User' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <PersonNewEditForm isView={false} path={getPath(role)} /> */}
    </Container>
  );
}
