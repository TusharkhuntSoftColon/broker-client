import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function PersonEditView() {
  const settings = useSettingsContext();
  // const adminData = useSelector((data: any) => data?.admin?.personList);
  // const currentUser = adminData.find((user: any) => user._id === id);

  // console.log({ adminData });
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
          { name: 'Edit' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <PersonNewEditForm currentUser={currentUser} path={getPath(role)} /> */}
    </Container>
  );
}
