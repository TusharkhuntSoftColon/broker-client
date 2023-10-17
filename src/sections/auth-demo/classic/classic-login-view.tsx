import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { PATH_AFTER_LOGIN, PATH_DASHBOARD } from 'src/config-global';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import authService from 'src/services/authService';
import { useSnackbar } from 'notistack';
import { C } from '@fullcalendar/core/internal-common';

// ----------------------------------------------------------------------

export default function ClassicLoginView() {
  const password = useBoolean();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

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

  //login api
  const { mutate, isLoading } = useMutation(authService.login, {
    onSuccess: (data1) => {
      enqueueSnackbar(data1?.message, { variant: 'success' });
      localStorage.setItem('user', JSON.stringify(data1?.data));
      router.push(PATH_DASHBOARD);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      mutate(data);
      // await new Promise((resolve) => setTimeout(resolve, 500));
      // router.push(PATH_AFTER_LOGIN);
      // console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Typography variant="h4">Sign in </Typography>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
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
