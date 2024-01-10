import * as React from 'react';
import { useSelector } from 'react-redux';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import BrokerageListPage from 'src/pages/dashboard/brokerage/list';

import { PersonCreateView } from 'src/sections/person/view';
import PersonNewEditForm from 'src/sections/person/person-new-edit-form';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const role = useSelector((data: any) => data.auth.role);

  const getPath = (roleOfPerson: any) => {
    switch (roleOfPerson) {
      case 'ADMIN':
        return paths.dashboard;
      case 'SUPER_MASTER':
        return paths.superMaster;
      case 'MASTER':
        return paths.master;
      // Add other cases for different roles with their respective paths
      default:
        return paths.dashboard.person; // Return a default path if role doesn't match
    }
  };

  return (
    <Box sx={{ width: '100%', ml: 1 }}>
      <PersonCreateView />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="User" {...a11yProps(0)} />
          <Tab label="Brokerage" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PersonNewEditForm isView={false} path={getPath(role)} setTabValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BrokerageListPage />
      </CustomTabPanel>
    </Box>
  );
}
