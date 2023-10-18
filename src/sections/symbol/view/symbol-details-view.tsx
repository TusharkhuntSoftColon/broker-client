import { useState, useCallback } from 'react';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _symbolList } from 'src/_mock';

import { useSettingsContext } from 'src/components/settings';

import SymbolNewEditForm from '../symbol-new-edit-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function SymbolDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentSymbol = _symbolList.filter((symbol) => symbol.id === id)[0];

  console.log(currentSymbol);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`${currentSymbol.name} Symbol Details`}
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
        isView={true}
        id={currentSymbol?.id}
      />
      <SymbolNewEditForm currentUser={currentSymbol} isView={true} />
    </Container>
  );
}
