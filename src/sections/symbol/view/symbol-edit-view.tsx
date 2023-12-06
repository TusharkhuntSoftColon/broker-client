import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { memo, useEffect, useMemo, useState } from 'react';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import symbolService from 'src/services/symbolService';

import { useSelector } from 'react-redux';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import SymbolNewEditForm from '../symbol-new-edit-form';

// ----------------------------------------------------------------------
function SymbolEditView({ id }: { id: any }) {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const symbolData = useSelector((data: any) => data?.symbol?.symbolList);

  console.log({ id });
  // console.log({ symbolData });

  const currentSymbol1 = useMemo(
    () => symbolData?.filter((symbol: any) => symbol._id === id)[0],
    [symbolData]
  );

  // console.log({ currentSymbol });

  const [currentSymbol, setCurrentSymbol] = useState<any>();

  console.log({ currentSymbol });

  const { mutate } = useMutation(symbolService.getSymbol_by_Id, {
    onSuccess: (data: any) => {
      setCurrentSymbol(data?.data);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });
  useEffect(() => {
    mutate(id);
  }, []);

  // console.log({ symbolData });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={id ? 'Update a symbol' : 'Create a new symbol'}
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Symbol',
            href: paths.dashboard.symbol.root,
          },
          { name: 'New Symbol' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SymbolNewEditForm currentUser={currentSymbol1} />
    </Container>
  );
}

export default memo(SymbolEditView);
