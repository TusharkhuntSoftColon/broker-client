import { useState, useCallback } from 'react';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _symbolList, _userList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentUser = _userList.filter((user) => user.id === id)[0];

  console.log({ currentUser });
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
            href: paths.dashboard.user.root,
          },
          { name: 'Admin Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        isView={true}
        id={currentUser?.id}
      />
      <UserNewEditForm currentUser={currentUser} isView={true} />
    </Container>
  );
}
