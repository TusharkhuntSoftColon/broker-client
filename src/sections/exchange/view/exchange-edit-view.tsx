import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetProduct } from 'src/api/product';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ExchangeNewEditForm from '../exchange-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function ExchangeEditView({ id }: Props) {
  const settings = useSettingsContext();

  const { product: currentProduct } = useGetProduct(id);

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
          { name: currentProduct?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        
      />

      <ExchangeNewEditForm currentProduct={currentProduct} />
    </Container>
  );
}
