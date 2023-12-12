import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { paths } from 'src/routes/paths';
import MasterListView from './../../../sections/master/view/master-list-view';

// ----------------------------------------------------------------------

export default function MasterListPage() {
  const role = useSelector((data: any) => data.auth.role);
  console.log({ role });
  // const path = paths.dashboard;

  const getPath = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return paths.dashboard.master;
      case 'SUPER_MASTER':
        return paths.superMaster.master;
      case 'MASTER':
        return paths.superMaster.master;
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

      <MasterListView path={getPath('SUPER_MASTER')} />
    </>
  );
}
