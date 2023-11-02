import { useState, useCallback, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _symbolList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import SymbolNewEditForm from '../symbol-new-edit-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useMutation } from '@tanstack/react-query';
import symbolService from 'src/services/symbolService';
import { useSnackbar } from 'notistack';
import { isAxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Typography from '@mui/material/Typography';
import { Card, Grid, styled } from '@mui/material';
import Divider from '@mui/material/Divider';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

const CustomStyledTextKey = styled(Typography)({
  borderRadius: 3,
  padding: '10px',
  color: 'rgb(99, 115, 129)',
});

const CustomStyledText = styled(Typography)({
  borderRadius: 3,
  padding: '10px',
});

export default function SymbolDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  // const { enqueueSnackbar } = useSnackbar();

  const symbolData = useSelector((data: any) => data?.symbol?.symbolList);

  // const [symbolData, setSymbolData] = useState<any>();

  const { mutate } = useMutation(symbolService.getSymbolList, {
    onSuccess: (data) => {
      console.log({ data });
      // setSymbolData(data?.data?.rows);
      // enqueueSnackbar(data?.message, { variant: 'success' });
    },
    onError: (error: any) => {
      console.log({ error });
      if (isAxiosError(error)) {
        // enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });
  // useEffect(() => {
  //   mutate();
  // }, []);

  console.log({ symbolData });

  const currentSymbol = useMemo(
    () => symbolData?.filter((symbol: any) => symbol.id === id)[0],
    [symbolData]
  );

  console.log({ currentSymbol });
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${currentSymbol?.name} Symbol Details`}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Symbol',
            href: paths.dashboard.symbol.root,
          },
          { name: 'Symbol Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        path={paths.dashboard.symbol.edit(id)}
        isView={true}
        id={currentSymbol?.id}
      />
      {/* <SymbolNewEditForm currentUser={currentSymbol} isView={true} /> */}
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              py: 2,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', py: 3 }}>
              <CustomStyledTextKey>Name</CustomStyledTextKey>
              <CustomStyledTextKey>Contract Size</CustomStyledTextKey>
              <CustomStyledTextKey>Currency</CustomStyledTextKey>
              <CustomStyledTextKey>Spread</CustomStyledTextKey>
              <CustomStyledTextKey>Min Volume</CustomStyledTextKey>
              <CustomStyledTextKey>Max Volume</CustomStyledTextKey>
              <CustomStyledTextKey>Maintenance Margin</CustomStyledTextKey>
              {/* <CustomStyledTextKey>Limit Of Add User</CustomStyledTextKey> */}
              {/* <CustomStyledTextKey>leverageY</CustomStyledTextKey> */}
              {/* <CustomStyledTextKey>leverageX</CustomStyledTextKey> */}
              <CustomStyledTextKey>Initial Margin</CustomStyledTextKey>
              <CustomStyledTextKey>Stop Level</CustomStyledTextKey>
              <CustomStyledTextKey>Tick Size</CustomStyledTextKey>
              <CustomStyledTextKey>Tick Value</CustomStyledTextKey>
              <CustomStyledTextKey>Stop Loss</CustomStyledTextKey>
              <CustomStyledTextKey>Symbol Status</CustomStyledTextKey>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', px: 1, py: 3 }}>
              <CustomStyledText>{currentSymbol.name}</CustomStyledText>
              <CustomStyledText>{currentSymbol.contractSize}</CustomStyledText>
              <CustomStyledText>{currentSymbol.currency.value}</CustomStyledText>
              <CustomStyledText>{currentSymbol.spread}</CustomStyledText>
              <CustomStyledText>{currentSymbol.minVolume}</CustomStyledText>
              <CustomStyledText>{currentSymbol.maxVolume}</CustomStyledText>
              <CustomStyledText>{currentSymbol.maintenanceMargin}</CustomStyledText>
              {/* <CustomStyledText>{currentSymbol.limitOfAddUser}</CustomStyledText> */}
              {/* <CustomStyledText>{currentSymbol.leverageY}</CustomStyledText> */}
              {/* <CustomStyledText>{currentSymbol.leverageX}</CustomStyledText> */}
              <CustomStyledText>{currentSymbol.initialMargin}</CustomStyledText>
              <CustomStyledText>{currentSymbol.stopLevel}</CustomStyledText>
              <CustomStyledText>{currentSymbol.tickSize}</CustomStyledText>
              <CustomStyledText>{currentSymbol.tickValue}</CustomStyledText>
              <CustomStyledText>{currentSymbol.stAndTp.label}</CustomStyledText>
              <CustomStyledText sx={{ color: currentSymbol.isActiveSymbol ? 'green' : 'red' }}>
                {currentSymbol.isActiveSymbol ? 'Active' : 'In Active'}
              </CustomStyledText>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
