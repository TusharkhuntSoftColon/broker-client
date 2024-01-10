import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Iconify from '../../../components/iconify';
import { useGetProduct } from '../../../api/product';
import { RouterLink } from '../../../routes/components';
import EmptyContent from '../../../components/empty-content';
import { useSettingsContext } from '../../../components/settings';

// import ProductDetailsReview from '../product-details-review';
// import { ProductDetailsSkeleton } from '../product-skeleton';
// import ProductDetailsSummary from '../product-details-summary';
// import ProductDetailsToolbar from '../product-details-toolbar';
// import ProductDetailsCarousel from '../product-details-carousel';
// import ProductDetailsDescription from '../product-details-description';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% Original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 Day Replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year Warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function BrokerageDetailsView({ id }: Props) {
  const { product, productError } = useGetProduct(id);

  const settings = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('description');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderError = (
    <EmptyContent
      filled
      title={`${productError?.message}`}
      action={
        <Button
          component={RouterLink}
          // href={paths.dashboard.exchange.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderProduct = product && (
    <>
      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid xs={12} md={6} lg={7}>
          {/* <ProductDetailsCarousel product={product} /> */}
        </Grid>

        <Grid xs={12} md={6} lg={5}>
          {/* <ProductDetailsSummary disabledActions product={product} /> */}
        </Grid>
      </Grid>

      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 10 }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: 'center', px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: 'primary.main' }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            px: 3,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {[
            {
              value: 'description',
              label: 'Description',
            },
            {
              value: 'reviews',
              label: `Reviews (${product.reviews.length})`,
            },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Card>
    </>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* {productLoading && renderSkeleton} */}

      {productError && renderError}

      {product && renderProduct}
    </Container>
  );
}
