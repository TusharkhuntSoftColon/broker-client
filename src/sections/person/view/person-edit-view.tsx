import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PersonNewEditForm from '../person-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PersonEditView({ id }: Props) {
  const settings = useSettingsContext();
  const adminData = useSelector((data: any) => data?.admin?.personList);
  const currentUser = adminData.find((user: any) => user._id === id);

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

  // console.log({ adminData });
  console.log({ currentUser });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Admstr',
            href: paths.dashboard.root,
          },
          {
            name: 'Admin',
            href: paths.dashboard.root,
          },
          { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PersonNewEditForm currentUser={currentUser} path={getPath(role)} />
    </Container>
  );
}
