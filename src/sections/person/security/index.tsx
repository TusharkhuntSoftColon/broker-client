/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-useless-fragment */
import * as Yup from 'yup';
import { useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import Container from '@mui/material/Container';

import { useParams } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import adminService from 'src/services/adminService';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';

import { RHFTextField } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';

export default function PersonSecurity({ currentUser }: any) {
  const settings = useSettingsContext();
  const { role } = useAuth();

  console.log({ currentUser });

  const { id }: any = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const changeUserPasswordByRole: any = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return adminService.changeUserPassword;
      case 'SUPER_MASTER':
        return superMasterService.changeUserPassword;
      case 'MASTER':
        return masterService.changeUserPassword;
      default:
        return masterService.changeUserPassword; // Return a default path if role doesn't match
    }
  };
  const changeInvestorPasswordByRole: any = (role2: any) => {
    switch (role2) {
      case 'ADMIN':
        return adminService.changeInvestorPassword;
      case 'SUPER_MASTER':
        return superMasterService.changeInvestorPassword;
      case 'MASTER':
        return masterService.changeInvestorPassword;
      default:
        return masterService.changeInvestorPassword; // Return a default path if role doesn't match
    }
  };
  const changeMasterPasswordByRole: any = (role2: any) => {
    switch (role2) {
      case 'ADMIN':
        return adminService.changeMasterPassword;
      case 'SUPER_MASTER':
        return superMasterService.changeMasterPassword;
      default:
        return superMasterService.changeMasterPassword; // Return a default path if role doesn't match
    }
  };
  //   const { mutate: getUsdList } = useMutation(commonServices.getUsdList, {
  //     onSuccess: (data) => {
  //       console.log({ data });
  //       setUsdList(data?.data?.rows);
  //       // setExchangeData(data?.data?.rows);
  //       // dispatch(addExchange(data?.data?.rows));
  //     },
  //     onError: (error) => {
  //       if (isAxiosError(error)) {
  //         enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
  //       }
  //     },
  //   });

  const defaultValues = useMemo(
    () => ({
      userPassword: '',
      investorPassword: '',
      superMasterPassword: '',
      masterPassword: '',
    }),
    []
  );
  const methods = useForm<any>({
    resolver: yupResolver(
      Yup.object().shape({
        userPassword: Yup.string().required('User Password is required'),
        investorPassword: Yup.string().required('Investor Password is required'),
      })
    ),
    defaultValues,
  });

  //   useEffect(() => {
  //     getUsdList();
  //   }, []);
  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutate: changeUserPassword }: any = useMutation(changeUserPasswordByRole(role), {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      reset();
    },

    onError: (error: any) => {
      console.log({ error });
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
  const { mutate: changeInvestorPassword }: any = useMutation(changeInvestorPasswordByRole(role), {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      reset();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
  const { mutate: changeMasterPassword }: any = useMutation(changeMasterPasswordByRole(role), {
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, { variant: 'success' });
      reset();
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });
  const { mutate: changeSuperMasterPassword }: any = useMutation(
    adminService.changeSuperMasterPassword,
    {
      onSuccess: (data) => {
        enqueueSnackbar(data?.message, { variant: 'success' });
        reset();
      },
      onError: (error: any) => {
        enqueueSnackbar(error?.message, { variant: 'error' });
      },
    }
  );

  const values = watch();

  const setUserPassword = () => {
    changeUserPassword({ password: values?.userPassword, id: currentUser?._id });
  };

  const setInvestorPassword = () => {
    changeInvestorPassword({ password: values?.investorPassword, id: currentUser?._id });
  };

  const setSuperMasterPassword = () => {
    changeSuperMasterPassword({ password: values?.superMasterPassword, id: currentUser?._id });
  };

  const setMasterPassword = () => {
    changeMasterPassword({ password: values?.masterPassword, id: currentUser?._id });
  };

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        {/* <CustomBreadcrumbs
          heading="Set Custom USD Price"
          links={[
            { name: 'Admstr', href: paths.dashboard.root },
            // { name: 'Set USD', href: paths.dashboard.setUsd.root },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        /> */}

        <FormProvider methods={methods}>
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 7, margin: 3 }}>
                {currentUser?.role === 'USER' && (
                  <Box>
                    <Box>
                      <RHFTextField name="userPassword" label="User Password" />
                      <LoadingButton
                        onClick={() => setUserPassword()}
                        variant="contained"
                        sx={{ float: 'right', margin: 1 }}
                        loading={isSubmitting}
                      >
                        Set Password
                      </LoadingButton>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                      <RHFTextField name="investorPassword" label="Investor Password" />
                      <LoadingButton
                        //   type="submit"
                        onClick={() => setInvestorPassword()}
                        variant="contained"
                        sx={{ float: 'right', margin: 1 }}
                        loading={isSubmitting}
                      >
                        Set Password
                      </LoadingButton>
                    </Box>
                  </Box>
                )}
                {currentUser?.role === 'SUPER_MASTER' && (
                  <Box>
                    <Box>
                      <RHFTextField name="superMasterPassword" label="Super Master Password" />
                      <LoadingButton
                        onClick={() => setSuperMasterPassword()}
                        variant="contained"
                        sx={{ float: 'right', margin: 1 }}
                        loading={isSubmitting}
                      >
                        Set Password
                      </LoadingButton>
                    </Box>
                  </Box>
                )}
                {currentUser?.role === 'MASTER' && (
                  <Box>
                    <Box>
                      <RHFTextField name="masterPassword" label="Master Password" />
                      <LoadingButton
                        onClick={() => setMasterPassword()}
                        variant="contained"
                        sx={{ float: 'right', margin: 1 }}
                        loading={isSubmitting}
                      >
                        Set Password
                      </LoadingButton>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
