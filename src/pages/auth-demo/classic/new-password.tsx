import { Helmet } from 'react-helmet-async';

import { ClassicNewPasswordView } from 'src/sections/auth-demo/classic';

// ----------------------------------------------------------------------

export default function ClassicNewPasswordPage() {
  return (
    <>
      <Helmet>
        <title> Auth Classic: New Password</title>
      </Helmet>

      <ClassicNewPasswordView />
    </>
  );
}
