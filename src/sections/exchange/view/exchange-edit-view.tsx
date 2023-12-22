import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';

import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import exchangeService from 'src/services/exchangeService';
import ExchangeNewEditForm from '../exchange-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExchangeEditView({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const [currentExchange, setCurrentExchange] = useState<any>();

  const {} = useMutation(exchangeService.getExchangeListById, {
    onSuccess: (data) => {
      setCurrentExchange(data?.data);
    },
    onError: (errror) => {
      if (isAxiosError(errror)) {
      }
    },
  });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Exchange',
            // href: paths.dashboard.exchange.root,
          },
          // { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExchangeNewEditForm currentExchange={{}} />
    </Container>
  );
}
