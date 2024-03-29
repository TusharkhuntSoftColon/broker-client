/* eslint-disable consistent-return */
import * as Yup from 'yup';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';
import { useBoolean } from 'src/hooks/use-boolean';

import authService from 'src/services/authService';
import { PATH_USER, PATH_MASTER, PATH_DASHBOARD, PATH_SUPER_MASTER } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ClassicLoginView() {
  const password = useBoolean();
  const router = useRouter();
  const { setCredentialsAction } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const getAfterLoginPath = (role: any) => {
    switch (role) {
      case 'ADMIN':
        return PATH_DASHBOARD;
      case 'SUPER_MASTER':
        return PATH_SUPER_MASTER;
      case 'MASTER':
        return PATH_MASTER;
      case 'USER':
        return PATH_USER;
      // Add other cases for different roles with their respective paths
      default:
        return PATH_USER; // Return a default path if role doesn't match
    }
  };

  const LoginSchema = Yup.object().shape({
    id: Yup.string().required('Id is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    id: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // login api
  const { mutate } = useMutation(authService.login, {
    onSuccess: (data) => {
      setCredentialsAction(data?.data);
      enqueueSnackbar(data?.message, { variant: 'success' });
      router.push(getAfterLoginPath(data?.data?.role));
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    const uppercaseData = { ...data, id: data.id.toUpperCase() };
    try {
      const res = await mutate(uppercaseData);
      return res;
    } catch (error) {
      console.error(error);
      // Handle the error
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Typography variant="h4">Sign in </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="id" label="ID" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* <Link
        component={RouterLink}
        href={paths.auth.forgotPassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        Forgot password?
      </Link> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
