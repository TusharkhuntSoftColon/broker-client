/* eslint-disable arrow-body-style */

import { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';

import AppNewInvoice from '../app-new-invoice';
import ClientTableDashboard from '../client-new-table';
import SymbolTableDashboard from '../symbol-new-table';
import MarginCallTableDashboard from '../margin-call-table';

const TableComponents = [
  { name: 'Symbol', component: <SymbolTableDashboard /> },
  { name: 'Users', component: <ClientTableDashboard /> },
  { name: 'Margin Call', component: <MarginCallTableDashboard /> },
  { name: 'Exchange', component: <AppNewInvoice /> },
];

const OverviewAppView = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([
    'Symbol',
    'Users',
    'Margin Call',
    'Exchange',
  ]);

  const handleButtonClick = (tableName: string) => {
    if (selectedButtons.includes(tableName)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== tableName));
    } else {
      setSelectedButtons([...selectedButtons, tableName]);
    }
  };

  const renderComponent = (componentName: string) => {
    const selectedComponent = TableComponents.find((comp) => comp.name === componentName);
    if (selectedComponent && selectedButtons.includes(componentName)) {
      return selectedComponent.component;
    }
    return null;
  };
  return (
    <Box width="100%">
      <Box sx={{ margin: 3 }}>
        {TableComponents.map((data: any) => {
          return (
            <LoadingButton
              key={data.name}
              onClick={() => handleButtonClick(data.name)}
              sx={{
                backgroundColor: selectedButtons.includes(data.name) ? '#919eab29' : 'transparent',
                color: selectedButtons.includes(data.name) ? 'black' : 'black',
                '&:hover': {
                  backgroundColor: selectedButtons.includes(data.name) ? '#4b51572b' : '#4b51572b',
                  boxShadow: 'none',
                },
                margin: 0.2,
              }}
            >
              {data.name}
            </LoadingButton>
          );
        })}
      </Box>
      <Grid container style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {TableComponents.slice(0, 3).map((table) => (
          <Grid item xs={12} key={table.name}>
            {renderComponent(table.name)}
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {TableComponents.slice(3).map((table) => (
          <Grid item xs={12} key={table.name}>
            {renderComponent(table.name)}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default OverviewAppView;
