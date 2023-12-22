import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { _appInvoices } from 'src/_mock';

function CustomTabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabsTable() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Item 1',
      value: 0,
      title: 'New Invoice',
      tableDatas: _appInvoices,
      tableLabel: [
        { id: 'id', label: 'Invoice ID' },
        { id: 'category', label: 'Category' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
        { id: '' },
      ],
    },
    {
      label: 'Item 2',
      value: 1,
      title: 'New Invoice 2',
      tableDatas: _appInvoices,
      tableLabel: [
        { id: 'category', label: 'Category' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
        { id: '' },
      ],
    },
    {
      label: 'Item 3',
      value: 2,
      title: 'New Invoice 3',
      tableDatas: _appInvoices,
      tableLabel: [
        { id: 'id', label: 'Invoice ID' },
        { id: 'category', label: 'Category' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
        { id: '' },
      ],
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}></Box>
    </Box>
  );
}
