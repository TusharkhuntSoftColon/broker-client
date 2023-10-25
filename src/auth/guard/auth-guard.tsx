import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import useAuth from 'src/hooks/useAuth';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.login,
  auth0: paths.auth.login,
  amplify: paths.auth.login,
  firebase: paths.auth.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container>{children}</Container>}</>;
}

// ----------------------------------------------------------------------

function Container({ children }: Props) {
  const router = useRouter();
  const navigate = useNavigate();

  const { authenticated, method } = useAuthContext();
  const { token } = useAuth();

  console.log({ token });

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!token) {
      // const searchParams = new URLSearchParams({
      //   returnTo: window.location.pathname,
      // }).toString();

      console.log({ token });

      router.replace('/auth/login');

      // const loginPath = loginPaths[method];

      // const href = `${loginPath}?${searchParams}`;

      // router.replace(href);
    } else {
      // router.replace('/admstr');
      // navigate(-1);
      setChecked(true);
    }
  }, [ router, token]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
