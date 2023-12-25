import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PersonNewEditForm from '../person-new-edit-form';

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
            href: paths.dashboard.root,
          },
          { name: 'New Person' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PersonNewEditForm isView={false} path={getPath(role)} />
    </Container>
  );
}
