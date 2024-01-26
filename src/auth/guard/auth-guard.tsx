import { useState, useEffect, useCallback } from 'react';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

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

  const { token } = useAuth();

  // console.log({ token });

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!token) {
      router.replace('/auth/login');
    } else {
      setChecked(true);
    }
  }, [router, token]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
