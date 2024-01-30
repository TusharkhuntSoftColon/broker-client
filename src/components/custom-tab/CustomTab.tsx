import * as React from 'react';
import { useSelector } from 'react-redux';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import BrokeragePage from 'src/pages/dashboard/brokerage/list';

import PersonNewEditForm from 'src/sections/person/person-new-edit-form';
import { PersonEditView, PersonCreateView } from 'src/sections/person/view';

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
  const params = useParams();

  const { id } = params;

  const adminData = useSelector((data: any) => data?.admin?.personList);
  const currentUser = adminData.find((user: any) => user._id === id);
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
      default:
        return paths.dashboard.person;
    }
  };
  return (
    <Box sx={{ width: '100%', ml: 2 }}>
      {currentUser ? <PersonEditView /> : <PersonCreateView />}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="User" {...a11yProps(0)} />
          <Tab label="Brokerage" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PersonNewEditForm
          isView={false}
          currentUser={currentUser}
          path={getPath(role)}
          setTabValue={setValue}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BrokeragePage currentUser={currentUser} />
      </CustomTabPanel>
    </Box>
  );
}
