import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { paths } from 'src/routes/paths';
import { PersonCreateView } from 'src/sections/person/view';

// ----------------------------------------------------------------------

export default function PersonCreatePage() {
  const role = useSelector((data: any) => data.auth.role);
  // const path = paths.dashboard;

  const getPath = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return paths.dashboard.master;
      case 'SUPER MASTER':
        return paths.superMaster.master;
      // Add other cases for different roles with their respective paths
      default:
        return paths; // Return a default path if role doesn't match
    }
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Master</title>
      </Helmet>

      <PersonCreateView />
    </>
  );
}
