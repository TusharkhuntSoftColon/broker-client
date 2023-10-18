import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExchangeNewEditForm from '../exchange-new-edit-form';
import { useMutation } from '@tanstack/react-query';
import exchangeService from 'src/services/exchangeService';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

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
            href: paths.dashboard.exchange.root,
          },
          // { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ExchangeNewEditForm currentExchange={{ currentExchange }} />
    </Container>
  );
}
