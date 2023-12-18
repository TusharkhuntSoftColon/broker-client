import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';

import { useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import SuperMasterNewEditForm from '../super-master-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function SuperMasterDetailsView({ id }: Props) {
  const adminData = useSelector((data: any) => data?.admin?.adminList);
  const settings = useSettingsContext();

  const currentUser = adminData.filter((user: any) => user.id === id)[0];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${currentUser.name} Admin Details`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Admin',
            // href: paths.dashboard.user.root,
          },
          { name: 'Admin Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        isView={true}
        // path={paths.dashboard.user.edit(id)}
        id={currentUser?.id}
      />
      <SuperMasterNewEditForm currentUser={currentUser} isView={true} />
    </Container>
  );
}
