import * as React from 'react';
import { useSelector } from 'react-redux';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import UserFinantials from 'src/sections/person/User/UserFinantials/userFinantials';
import { PersonEditView, PersonCreateView, PersonDetailsView } from 'src/sections/person/view';

import BasicTabs from './CustomTab';

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

export default function PersonTabsPanel() {
  const params = useParams();

  const { id } = params;

  const adminData = useSelector((data: any) => data?.admin?.personList);
  const currentUser = adminData.find((user: any) => user._id === id);
  const [value, setValue] = React.useState(0);
  const [fields, setFields] = React.useState<any>([]);

  console.log({ currentUser });

  console.log({ fields });

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
          {currentUser && <Tab label="Overview" {...a11yProps(0)} />}
          <Tab label="Personal" {...a11yProps(1)} />
          {currentUser && <Tab label="Balance" {...a11yProps(2)} />}
          {currentUser && <Tab label="History" {...a11yProps(3)} />}
        </Tabs>
      </Box>
      {currentUser && (
        <CustomTabPanel value={value} index={0}>
          {/* <PersonNewEditForm
          isView={false}
          currentUser={currentUser}
          path={getPath(role)}
          setTabValue={setValue}
          setFieldsValue={setFields}
        /> */}
          <PersonDetailsView currentUser={currentUser} />
        </CustomTabPanel>
      )}
      <CustomTabPanel value={value} index={currentUser ? 1 : 0}>
        {/* <BrokeragePage fields={fields} currentUser={currentUser} /> */}
        <BasicTabs />
      </CustomTabPanel>
      {currentUser && (
        <CustomTabPanel value={value} index={2}>
          {/* <BrokeragePage fields={fields} currentUser={currentUser} /> */}
          <UserFinantials />
        </CustomTabPanel>
      )}
      {currentUser && (
        <CustomTabPanel value={value} index={3}>
          {/* <BrokeragePage fields={fields} currentUser={currentUser} /> */}
          <Box>History</Box>
        </CustomTabPanel>
      )}
    </Box>
  );
}
