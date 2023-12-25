import { useState } from 'react';
import { useSnackbar } from 'notistack';

import Container from '@mui/material/Container';

import { paths } from '../../../routes/paths';
import BrokerageNewEditForm from '../brokerage-new-edit-form';
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function BrokerageEditView({ id }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const settings = useSettingsContext();
  const [currentExchange, setCurrentExchange] = useState<any>();

  // const {} = useMutation(exchangeService.getExchangeListById, {
  //   onSuccess: (data) => {
  //     setCurrentExchange(data?.data);
  //   },
  //   onError: (errror) => {
  //     if (isAxiosError(errror)) {
  //     }
  //   },
  // });
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

      <BrokerageNewEditForm currentExchange={{ }} />
    </Container>
  );
}
