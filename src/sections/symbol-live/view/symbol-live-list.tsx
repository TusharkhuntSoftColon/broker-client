/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable react-hooks/rules-of-hooks */
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';
// import { io } from 'https://cdn.socket.io/4.7.2/socket.io.esm.min.js';

import { io } from 'socket.io-client';
import { useMutation } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Box, Table, TextField, TableBody, InputAdornment, TableContainer } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/useAuth';

import { SOCKET_URL } from 'src/utils/environments';

import { deleteAdmin } from 'src/store/slices/admin';
import symbolService from 'src/services/symbolService';
import exchangeService from 'src/services/exchangeService';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useTable, getComparator, TableHeadCustom } from 'src/components/table';

import { IUserItem, IUserTableFilters } from 'src/types/user';

import ImportMonthList from '../ImportMonthList';
import SymbolLiveTableRow from '../symbol-live-table-row';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'symbol', label: 'Symbol', width: 100 },
  { id: 'bid', label: 'Bid', width: 90, align: 'right' },
  { id: 'ask', label: 'Ask', width: 90, align: 'right' },
  { id: 'dailyChange', label: 'Daily Change', width: 150, align: 'right' },
];

const defaultFilters: IUserTableFilters = {
  name: '',
  role: [],
  status: 'all',
};

interface formattedDataInterface {
  name: string;
  _id: string;
  importMonth: {
    label: string;
    value: string;
  }[];
}

// ----------------------------------------------------------------------
export default function xxSymbolLiveList() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { token } = useAuth();
  const table = useTable();
  const [tableData, setTableData] = useState<any>([]);
  const [symbolData, setSymbolData] = useState<any>([]);
  const [exchangeData, setExchangeData] = useState<formattedDataInterface[]>([]);
  const [activeSymbolData, setActiveSymbolData] = useState<any>([]);
  const [rows, setRow] = useState<any>([]);

  const { mutate } = useMutation(symbolService.getSymbolListByUser, {
    onSuccess: (data) => {
      const symbolnewData: any[] = data?.data?.rows;

      setSymbolData(symbolnewData);

      // set table data with empty socket
      const symbolTableDashboard = [];
      for (const symbols of symbolnewData) {
        symbolTableDashboard.push({
          id: symbols?._id,
          symbol: symbols?.name,
          bid: 0,
          ask: 0,
          dailyChange: 0,

          oldBuyPrice: 0,
          oldSellPrice: 0,
          oldPercentage: 0,
        });
      }
      setRow(symbolTableDashboard);

      setActiveSymbolData(symbolnewData);
      socketConnection(symbolnewData);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  interface exchangeListData {
    exchange: {
      name: string;
      _id: string;
    };
    historicalName: string;
    name: string;
    socketLiveName: string;
    _id: string;
  }

  const { mutate: exchangeList } = useMutation(exchangeService.getExchangeListByUser, {
    onSuccess: (data) => {
      const exchangeNewData: exchangeListData[] = data?.data?.rows;

      const formattedData: formattedDataInterface[] = [];

      exchangeNewData?.forEach((item: exchangeListData) => {
        // Check if an entry with the same exchange name already exists
        const existingEntry = formattedData.find((entry) => entry.name === item.exchange.name);

        if (existingEntry) {
          // If it exists, add the importMonth to the existing entry
          existingEntry.importMonth.push({
            label: item.name,
            value: item._id,
          });
        } else {
          // If it doesn't exist, create a new entry
          formattedData.push({
            name: item.exchange.name,
            _id: item.exchange._id,
            importMonth: [
              {
                label: item.name,
                value: item._id,
              },
            ],
          });
        }
      });

      setExchangeData(formattedData);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const { mutate: updateSelectSymbol } = useMutation(symbolService.updateSelectSymbol, {
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log('error', error);
    },
  });

  const socketConnection = async (activeSymbols: any) => {
    try {
      const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: {
          transport: 'websocket',
          EIO: '4',
          authorization: token,
        },
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      const Symbols = activeSymbols.map((symbol: any) => symbol?.socketLiveName);

      socket.on('connect', () => {
        console.log('[socket] Connected');
        socket.emit('subscribeToUserServerMarket', Symbols);
      });

      socket.emit('joinUserRoom', Symbols);

      socket.on('disconnect', (reason: any) => {
        console.log('[socket] Disconnected:', reason);
      });
      socket.on('error', (error: any) => {
        console.log('[socket] Error:', error);
      });

      socket.on('marketWatch', (data: any) => {
        console.log('marketWatch', data);
        setTableData((prev: any) => {
          let index1 = -1;

          for (let index = 0; index < prev.length; index++) {
            const data1 = prev[index];
            if (
              data1.InstrumentIdentifier &&
              data.InstrumentIdentifier &&
              data1.InstrumentIdentifier === data.InstrumentIdentifier
            ) {
              index1 = index;

              break;
            }
          }

          if (index1 === -1) {
            return [...prev, data];
          }

          const newObj = {
            ...data,
            oldBuyPrice: prev[index1].BuyPrice,
            oldSellPrice: prev[index1].SellPrice,
            oldPercentage: prev[index1].PriceChangePercentage,
          };
          prev[index1] = newObj;
          return [...prev];
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // socketConnection();
    mutate();
    exchangeList();
  }, []);

  useEffect(() => {
    const symbolTableDashboard = [];
    for (const data of tableData) {
      symbolTableDashboard.push({
        id: data.InstrumentIdentifier,
        symbol: data.InstrumentIdentifier,
        bid: data.BuyPrice,
        ask: data.SellPrice,
        dailyChange: data.PriceChangePercentage,

        oldBuyPrice: data.oldBuyPrice,
        oldSellPrice: data.oldSellPrice,
        oldPercentage: data.oldPercentage,
      });
    }
    setRow(symbolTableDashboard);
  }, [tableData]);

  useEffect(() => {}, [rows]);

  const [filters] = useState(defaultFilters);

  const dataFiltered = applyFilter({
    inputData: rows,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered?.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      console.log('delete row works');
      dispatch(deleteAdmin(id));
      enqueueSnackbar('Deleted Successfully', { variant: 'success' });
      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dispatch, enqueueSnackbar, table, dataInPage.length]
  );

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.person.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.person.details(id));
    },
    [router]
  );

  const [showExchange, setShowExchange] = useState<boolean>(false);
  const [activeExchange, setActiveExchange] = useState<formattedDataInterface | undefined>(
    undefined
  );

  interface importMonthInterface {
    id: string;
  }

  const [activeImportMonths, setActiveImportMonths] = useState<importMonthInterface[]>([]);

  return (
    <>
      <Box sx={{ height: '42px', borderBottom: '4px solid #e0e3eb' }}>
        <TextField
          fullWidth
          autoComplete="off"
          name="symbol"
          onClick={() => {
            setActiveImportMonths(rows);
            setShowExchange(true);
          }}
          value=""
          sx={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0px !important',
            '.MuiInputBase-input': { p: 1 },
            '.MuiInputBase-root': { borderRadius: '0px', height: '100%' },
          }}
          placeholder="Search symbol"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{
                    color: 'text.disabled',
                  }}
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Iconify
                  icon="eva:close-fill"
                  sx={{
                    color: 'text.disabled',
                  }}
                  onClick={() => {
                    setShowExchange(false);
                  }}
                />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Card
        sx={{
          width: '100%',
          borderRadius: '0px',
          bgcolor: 'white',
        }}
      >
        {showExchange ? (
          <Box
          // sx={{
          //   padding: 1,
          // }}
          >
            {!activeExchange ? (
              <>
                {exchangeData?.map((exchange: formattedDataInterface) => (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: '#F1F9FF',
                      },
                    }}
                    onClick={() => {
                      setActiveExchange(exchange);
                    }}
                  >
                    <Box
                      sx={{
                        alignItems: 'center',
                        cursor: 'pointer',
                        minHeight: '30px',
                        maxHeight: '44px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000000',
                        padding: 1,
                        fontFamily:
                          'Roboto,Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
                      }}
                    >
                      {exchange?.name}
                    </Box>
                    <Box
                      sx={{
                        alignItems: 'center',
                        cursor: 'pointer',
                        minHeight: '30px',
                        maxHeight: '44px',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000000',
                        padding: 1,
                        fontFamily:
                          'Roboto,Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
                      }}
                    >
                      {exchange?.importMonth?.length}
                    </Box>
                  </Box>
                ))}
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{
                      padding: 1,
                    }}
                    onClick={() => {
                      setActiveExchange(undefined);
                    }}
                  >
                    <ArrowBackIosIcon
                      style={{
                        cursor: 'pointer',
                        height: '20px',
                        width: '20px',
                        color: '#0B71F3',
                      }}
                    />
                  </Box>
                  <Box
                    onClick={() => {
                      setActiveExchange(undefined);
                    }}
                    sx={{
                      alignItems: 'center',
                      cursor: 'pointer',
                      minHeight: '30px',
                      maxHeight: '44px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0B71F3',
                      padding: 1,
                      fontFamily:
                        'Roboto,Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
                    }}
                  >
                    {activeExchange?.name}
                  </Box>
                </Box>
                <Box
                  sx={{
                    alignItems: 'center',
                    cursor: 'pointer',
                    minHeight: '30px',
                    maxHeight: '44px',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0B71F3',
                    padding: 1,
                    fontFamily:
                      'Roboto,Ubuntu,-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif',
                  }}
                >
                  {activeExchange?.importMonth?.map((item) => (
                    <ImportMonthList
                      checked={activeImportMonths.some(
                        (importMonth) => importMonth.id === item?.value
                      )}
                      item={item}
                      key={item?.value}
                      handleChannge={() => {
                        updateSelectSymbol({
                          selectedExchange: activeExchange?._id,
                          selectedImportMonth: item?.value,
                        });
                      }}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        ) : (
          <TableContainer
            sx={{ position: 'relative', overflow: 'unset', height: '100%' }}
            className="fonts-loaded"
          >
            <Scrollbar>
              <Table size={table.dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={rows?.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     rows.map((row: any) => row.id)
                  //   )
                  // }
                />
                <TableBody>
                  {rows.map((row: any, index: any) => (
                    <SymbolLiveTableRow
                      key={row?.id}
                      row={row}
                      selected={table.selected.includes(row?.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      index={index}
                    />
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>
        )}
      </Card>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IUserItem[] | any;
  comparator: (a: any, b: any) => number;
  filters: IUserTableFilters;
}) {
  const { name, status, role } = filters;

  const stabilizedThis = inputData?.map((el: any, index: any) => [el, index] as const);

  stabilizedThis?.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis?.map((el: any) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user: any) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((user: any) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user: any) => role.includes(user.role));
  }

  return inputData;
}
