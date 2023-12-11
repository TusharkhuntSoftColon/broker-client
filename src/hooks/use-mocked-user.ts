import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const ADMIN = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jay',
    email: 'demo@jay.cc',
    password: 'jay234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666545',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'ADMIN',
    r: 'dashboard',
  };

  const SUPER_MASTER = {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Jay',
    email: 'demo@jay.cc',
    password: 'jay234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666545',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'SUPER_MASTER',
    r: 'superMaster',
  };

  const MASTER = {
    id: '8864c717-587d-472a-929a-8e5f298024da-1',
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'ADMIN',
    r: 'master',
  };

  const USER = {
    id: '8864c717-587d-472a-929a-8e5f298024da-1',
    displayName: 'Jaydon Frankie',
    email: 'demo@minimals.cc',
    password: 'demo1234',
    photoURL: _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    role: 'USER',
    r: 'user',
  };

  return { ADMIN, SUPER_MASTER, MASTER, USER };
}

export const master = 'master';
export const user = 'user';
export const dashboard = 'dashboard';
export const superMaster = 'super-master';
