import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { useParams } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import adminService from 'src/services/adminService';
import masterService from 'src/services/masterService';
import superMasterService from 'src/services/superMasterService';

import PersonSecurity from 'src/sections/person/security';
import { PersonDetailsView } from 'src/sections/person/view';
import UserFinantials from 'src/sections/person/User/UserFinantials/userFinantials';

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
  const { role } = useAuth();

  const { id } = params;

  const { enqueueSnackbar } = useSnackbar();

  const [personData, setPersonData] = useState([]);
  const getAllPersonSByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return adminService.getAllPersons;
      case 'SUPER_MASTER':
        return superMasterService.getAllPersons;
      case 'MASTER':
        return masterService.getAllPersons;
      default:
        return masterService.getAllPersons;
    }
  };

  const { mutate } = useMutation(getAllPersonSByRole(role), {
    onSuccess: (data) => {
      setPersonData(data?.data?.rows);
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
    },
  });

  useEffect(() => {
    mutate();
  }, [id]);

  const currentUser = personData?.find((user: any) => user._id === id);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', ml: 2 }}>
      {/* {currentUser ? <PersonEditView /> : <PersonCreateView />} */}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          {currentUser && <Tab label="Overview" {...a11yProps(0)} />}
          <Tab label="Personal" {...a11yProps(1)} />
          {currentUser && <Tab label="Balance" {...a11yProps(2)} />}
          {currentUser && <Tab label="History" {...a11yProps(3)} />}
          {currentUser && <Tab label="Security" {...a11yProps(3)} />}
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
        <BasicTabs currentUser={currentUser} />
      </CustomTabPanel>
      {currentUser && (
        <CustomTabPanel value={value} index={2}>
          {/* <BrokeragePage fields={fields} currentUser={currentUser} /> */}
          <UserFinantials currentUser={currentUser} />
        </CustomTabPanel>
      )}
      {currentUser && (
        <CustomTabPanel value={value} index={3}>
          {/* <BrokeragePage fields={fields} currentUser={currentUser} /> */}
          <Box>History</Box>
        </CustomTabPanel>
      )}
      {currentUser && (
        <CustomTabPanel value={value} index={4}>
          {/* <BrokeragePage fields={fields} currentUser={currentUser} /> */}
          <PersonSecurity currentUser={currentUser} />
        </CustomTabPanel>
      )}
    </Box>
  );
}
