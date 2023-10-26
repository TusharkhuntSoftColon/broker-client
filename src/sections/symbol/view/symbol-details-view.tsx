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

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

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
      <SymbolNewEditForm currentUser={currentSymbol} isView={true} />
    </Container>
  );
}
