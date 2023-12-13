import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

import { useSelector } from 'react-redux';
import PersonNewEditForm from '../person-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function PersonEditView({ id }: Props) {
  const settings = useSettingsContext();
  const adminData = useSelector((data: any) => data?.admin?.personList);
  const currentUser = adminData.find((user: any) => user._id === id);

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

      <PersonNewEditForm currentUser={currentUser} />
    </Container>
  );
}
