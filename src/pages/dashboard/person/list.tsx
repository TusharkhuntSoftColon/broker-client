/* eslint-disable @typescript-eslint/no-shadow */
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

import { paths } from 'src/routes/paths';

import { PersonListView } from 'src/sections/person/view';

// ----------------------------------------------------------------------

export default function PersonListPage() {
  const role = useSelector((data: any) => data.auth.role);
  // const path = paths.dashboard;

  const getPath = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return paths.dashboard;
      case 'SUPER_MASTER':
        return paths.superMaster;
      case 'MASTER':
        return paths.master;
      // Add other cases for different roles with their respective paths
      default:
        return paths; // Return a default path if role doesn't match
    }
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Master List</title>
      </Helmet>

      <PersonListView path={getPath(role)} />
    </>
  );
}
