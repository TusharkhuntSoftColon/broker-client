import { isAxiosError } from 'axios';
import { useSnackbar } from 'notistack';
import { useState, useEffect, memo } from 'react';
import { useMutation } from '@tanstack/react-query';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import symbolService from 'src/services/symbolService';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import SymbolNewEditForm from '../symbol-new-edit-form';

// ----------------------------------------------------------------------
function SymbolEditView({ id }: { id: any }) {
  const settings = useSettingsContext();

  const { enqueueSnackbar } = useSnackbar();

  const [currentSymbol, setCurrentSymbol] = useState<any>();

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

  console.log({ currentSymbol });

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

      <SymbolNewEditForm currentUser={currentSymbol ? currentSymbol : undefined} />
    </Container>
  );
}

export default memo(SymbolEditView);
