/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';

import useAuth from 'src/hooks/useAuth';

import overviewService from 'src/services/overviewAppViewService';

import AppNewInvoice from '../app-new-invoice';
import ClientTableDashboard from '../client-new-table';
import SymbolTableDashboard from '../symbol-new-table';
import MarginCallTableDashboard from '../margin-call-table';

const OverviewAppView = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([
    'Symbol',
    'Users',
    'Margin Call',
    'Exchange',
  ]);

  const { role } = useAuth();

  // User Tables Data
  const [userPostions, setUserPosition] = useState<any>();
  const [userAccounts, setUserAccounts] = useState<any>();
  const [userOrders, setUserOrders] = useState<any>();
  const [exchangeTableSummaryData, setExchangeTableSummary] = useState<any>([]);
  const [symbolProperties, setSymbolProperties] = useState<any>([]);

  const TableComponents = [
    { name: 'Symbol', component: <SymbolTableDashboard /> },
    {
      name: 'Users',
      component: (
        <ClientTableDashboard
          accountData={userAccounts}
          ordersData={userOrders}
          positionsData={userPostions}
        />
      ),
    },
    { name: 'Margin Call', component: <MarginCallTableDashboard /> },
    {
      name: 'Exchange',
      component: <AppNewInvoice exchangeTableSummaryData={exchangeTableSummaryData} />,
    },
  ];

  const [currentTableCount, setCurrentTableCount] = useState<any | number>();

  useEffect(() => {
    const listArray = ['Symbol', 'Users', 'Margin Call'];
    const count = listArray.filter((item) => selectedButtons.includes(item)).length;

    console.log({ selectedButtons, listArray });
    setCurrentTableCount(count);
  }, [selectedButtons, currentTableCount]);

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

  const getUserPositionsByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return overviewService.getUserPositionsByAdmin;
      case 'SUPER_MASTER':
        return overviewService.getUserPositionsBySuperMaster;
      case 'MASTER':
        return overviewService.getUserPositionsByMaster;
      default:
        return overviewService.getUserPositionsByMaster;
    }
  };

  const getUserAccountsByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return overviewService.getUserAccountsByAdmin;
      case 'SUPER_MASTER':
        return overviewService.getUserAccountsBySuperMaster;
      case 'MASTER':
        return overviewService.getUserAccountsByMaster;
      default:
        return overviewService.getUserAccountsByMaster;
    }
  };
  const getUserOrdersByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return overviewService.getUserOrdersByAdmin;
      case 'SUPER_MASTER':
        return overviewService.getUserOrdersBySuperMaster;
      case 'MASTER':
        return overviewService.getUserOrdersByMaster;
      default:
        return overviewService.getUserOrdersByMaster;
    }
  };
  const getExchangeTableSummaryDataByRole = (role1: any) => {
    switch (role1) {
      case 'ADMIN':
        return overviewService.getExchangeTableSummaryByAdmin;
      case 'SUPER_MASTER':
        return overviewService.getExchangeTableSummaryBySuperMaster;
      case 'MASTER':
        return overviewService.getExchangeTableSummaryByMaster;
      default:
        return overviewService.getExchangeTableSummaryByMaster;
    }
  };
  // const getSymbolPropertiesByRole: any = (role1: any) => {
  //   switch (role1) {
  //     case 'ADMIN':
  //       return overviewService.getSymbolPropertiesByAdmin();
  //     case 'SUPER_MASTER':
  //       return overviewService.getSymbolPropertiesBySuperMaster();
  //     case 'MASTER':
  //       return overviewService.getSymbolPropertiesByMaster();
  //     default:
  //       return overviewService.getSymbolPropertiesByMaster();
  //   }
  // };

  // POSITIONS
  const { mutate: getUserPositions } = useMutation(getUserPositionsByRole(role), {
    onSuccess: (data) => {
      setUserPosition(data?.data?.rows);
    },
    onError: (error) => {
      console.log({ 'POSTIONS ERROR :- ': error });
    },
  });

  // ACCOUNTS
  const { mutate: getUserAccounts } = useMutation(getUserAccountsByRole(role), {
    onSuccess: (data) => {
      setUserAccounts(data?.data?.rows);
    },
    onError: (error) => {
      console.log({ 'ACCOUNTS ERROR :- ': error });
    },
  });

  // ORDERS
  const { mutate: getUserOrders } = useMutation(getUserOrdersByRole(role), {
    onSuccess: (data) => {
      setUserOrders(data?.data?.rows);
    },
    onError: (error) => {
      console.log({ 'ORDERS ERROR :- ': error });
    },
  });
  const { mutate: getAllExchangeSummaryData } = useMutation(
    getExchangeTableSummaryDataByRole(role),
    {
      onSuccess: (data) => {
        setExchangeTableSummary(data?.data?.rows);
      },
      onError: (error) => {
        console.log({ 'ORDERS ERROR :- ': error });
      },
    }
  );
  // const { mutate: getSelectedSymbolPropertyData } = useMutation(getSymbolPropertiesByRole(role), {
  //   onSuccess: (data) => {
  //     // setExchangeTableSummary(data?.data?.rows);
  //   },
  //   onError: (error) => {
  //     console.log({ 'ORDERS ERROR :- ': error });
  //   },
  // });

  // useEffect(() => {
  //   // Check if it's the first time the component is mounted
  //   const isFirstTime = localStorage.getItem('isFirstTime') === 'true';
  //   if (isFirstTime) {
  //     window.location.reload();
  //     localStorage.setItem('isFirstTime', 'false');
  //   }
  // }, []);

  // const { mutate: getSymbolProperty } = useMutation(getSymbolPropertiesByRole(role), {
  //   onSuccess: (data) => {
  //     console.log({ data });
  //     // setSymbolProperties(data?.rows);
  //   },
  //   onError: (error) => {
  //     console.log('error', error);
  //   },
  // });
  // useEffect(() => {
  //   getSymbolProperty();
  // }, []);
  useEffect(() => {
    getUserPositions();
    getUserAccounts();
    getUserOrders();
    getAllExchangeSummaryData();
  }, [getUserPositions, getUserAccounts, getUserOrders, getAllExchangeSummaryData]);

  return (
    <Box
      sx={{
        height: '96vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ margin: '20px 0px 0px 20px' }}>
        {/* First Child Box */}
        {TableComponents.map((data: any) => {
          return (
            <LoadingButton
              key={data.name}
              onClick={() => handleButtonClick(data.name)}
              sx={{
                fontSize: '11px',
                backgroundColor: selectedButtons.includes(data.name) ? '#919eab29' : 'transparent',
                color: selectedButtons.includes(data.name) ? 'black' : 'black',
                '&:hover': {
                  backgroundColor: selectedButtons.includes(data.name) ? '#4b51572b' : '#4b51572b',
                  boxShadow: 'none',
                },
                margin: 0.2,
                mt: '-1.6rem',
              }}
            >
              {data.name}
            </LoadingButton>
          );
        })}
      </Box>

      <Box sx={{ width: '100%', display: 'flex', flex: '1 1 auto' }}>
        {/* Second and Third Child Boxes */}
        {TableComponents.slice(0, 3).map((table) => (
          <Box
            key={table.name}
            sx={{
              fontSize: '10px',
              minWidth: 0, // Ensure content can overflow
              overflow: 'auto',
              height: '100%', // Enable scrolling if content overflows
            }}
            // width={
            //   currentTableCount === 2
            //     ? '50%'
            //     : currentTableCount === 1
            //       ? '100%'
            //       : table.name !== 'Users'
            //         ? '25%'
            //         : '50%'
            // }
            width={
              table.name === 'Users'
                ? !selectedButtons.includes('Symbol') || !selectedButtons.includes('Margin Call')
                  ? '100%'
                  : '50%'
                : !selectedButtons.includes(table.name)
                  ? '0%'
                  : '25%'
            }
          >
            {renderComponent(table.name)}
          </Box>
        ))}
      </Box>

      {/* Fourth Child Box */}
      <Grid container sx={{ flex: '0 0 auto', overflow: 'auto' }}>
        {/* Third Child Boxes */}
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
