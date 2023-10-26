import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _userList } from 'src/_mock';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

import UserNewEditForm from '../user-new-edit-form';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserEditView({ id }: Props) {
  const settings = useSettingsContext();

  console.log({ id });
  const adminData = useSelector((data: any) => data?.admin?.adminList);

  const currentUser = adminData.find((user: any) => user.id === id);

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
            href: paths.dashboard.user.root,
          },
          { name: currentUser?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <UserNewEditForm currentUser={currentUser} />
    </Container>
  );
}
