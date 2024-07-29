/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { resetState, setCredentials } from '../store/slices/auth';

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const userId = useSelector((state: RootState) => state.auth.userName);
  const displayName = useSelector((state: RootState) => state.auth.displayName);
  const role = useSelector((state: RootState) => state.auth.role);
  const userRole = useSelector((state: RootState) => state.auth.role);
  const _id = useSelector((state: RootState) => state.auth._id);
  const active = useSelector((state: RootState) => state.auth.active);

  const setCredentialsAction = (params: any) => {
    dispatch(setCredentials(params));
  };

  const logoutAction = () => {
    dispatch(resetState());
    navigate('/auth/logout');
  };

  return {
    role,
    active,
    userRole,
    token,
    displayName,
    userId,
    setCredentialsAction,
    logoutAction,
    _id,
  };
};

export default useAuth;
