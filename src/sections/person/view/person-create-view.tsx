import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function PersonCreateView() {
  return (
    <Box>
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
    </Box>
  );
}
