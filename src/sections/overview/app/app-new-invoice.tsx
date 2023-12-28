/* eslint-disable arrow-body-style */
import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { newInvoiceData, newInvoiceJournalData, newInvoiceExposureData } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type RowProps = {
  id: any;
  symbol: any;
  positions: any;
  buy_volume: any;
  buy_price: any;
  sell_volume: any;
  sell_price: any;
  net_volume: any;
  profit: any;
  unCovered: any;
  time: string;
  server: string;
  message: string;
  asset: string;
  clients: number;
  coverage: number;
  nettotal: number;
  rate: number;
  netTotal: number;
  positive: number;
  graph: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  styles: any;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #dddddd',
}));

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, styles, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={styles}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
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

export default function AppNewInvoice() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Summary',
      value: 0,
      title: 'Exchange Table',
      tableDatas: newInvoiceData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        {
          id: 'positions',
          label: 'Positions',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'buy_volume',
          label: 'Buy Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'buy_price',
          label: 'Buy Price',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'sell_volume',
          label: 'Sell Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'sell_price',
          label: 'Sell Price',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'net_volume',
          label: 'Net Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'profit',
          label: 'Profit (INR)',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'unCovered',
          label: 'Uncovered (INR)',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
      ],
    },
    {
      label: 'Exposure',
      value: 1,
      title: 'Exposure Table',
      tableDatas: newInvoiceExposureData,
      tableLabel: [
        { id: 'asset', label: 'Asset', align: 'left', border: '1px solid #dddddd !important' },
        {
          id: 'clients',
          label: 'Clients',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'coverage',
          label: 'Coverage',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'nettotal',
          label: 'Net Total',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'rate',
          label: 'Rate',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'netTotal',
          label: 'Net Total  INR)',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'positive',
          label: 'Positive (INR)',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'graph',
          label: 'Graph',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
      ],
    },
    {
      label: 'News',
      value: 2,
      title: 'News Table',
      tableDatas: newInvoiceData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        {
          id: 'positions',
          label: 'Positions',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'buy_volume',
          label: 'Buy Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'buy_price',
          label: 'Buy Price',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'sell_volume',
          label: 'Sell Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'sell_price',
          label: 'Sell Price',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'net_volume',
          label: 'Net Volume',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'profit',
          label: 'Profit (INR)',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
        {
          id: 'unCovered',
          label: 'Uncovered (INR)',
          align: 'right',
          border: '1px solid #dddddd !important',
        },
      ],
    },
    {
      label: 'Journal',
      value: 3,
      title: 'Journal Table',
      tableDatas: newInvoiceJournalData,
      tableLabel: [
        { id: 'time', label: 'Time', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'server', label: 'Server', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'message', label: 'Message', align: 'left', border: '1px solid #dddddd !important' },
      ],
    },
  ];
  return (
    <Card
      sx={{
        borderRadius: 0,
        height: 'inherit',
        border: '1px solid #d3d3d3',
        WebkitBorderRadius: '5px',
      }}
    >
      {/* <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
        View All
        </Button>
      </Box> */}
      <Box sx={{ margin: '5px', border: '1px solid #d3d3d3' }}>
        <Box>
          {tabs.map((data) => {
            return (
              <CustomTabPanel
                value={value}
                key={data.value}
                index={data.value}
                styles={{ overflow: 'hidden' }}
              >
                <CardHeader title={data.title} sx={{ mb: 4, mt: -1 }} />
                <TableContainer sx={{ overflow: 'unset', height: '400px' }}>
                  <Scrollbar>
                    <Table stickyHeader sx={{ minWidth: 680 }}>
                      <TableHeadCustom headLabel={data.tableLabel} />
                      <TableBody>
                        {data.tableDatas.map((row) => (
                          <AppNewInvoiceRow key={row.id} row={row} value={value} />
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </TableContainer>
              </CustomTabPanel>
            );
          })}
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              display: 'none',
            },
            '& .MuiTab-root': {
              marginRight: 0,
            },
          }}
        >
          {tabs.map((data: any) => {
            return (
              <Tab
                label={data.label}
                {...a11yProps(data.value)}
                sx={{
                  // ml: 2,
                  width: '7%',
                  marginRight: '0px !important',
                  borderTop: value === data.value ? 'none' : '1px solid #d3d3d3',
                  borderLeft: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                  borderRight: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                  // borderBottom: value === data.value ? '1px solid #d3d3d3' : '1px solid #d3d3d3',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
            );
          })}
        </Tabs>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type AppNewInvoiceRowProps = {
  row: RowProps | any;
  value: any;
};

function AppNewInvoiceRow({ row, value }: AppNewInvoiceRowProps) {
  const popover = usePopover();

  const handleDownload = () => {
    popover.onClose();
    console.info('DOWNLOAD', row.id);
  };

  const handlePrint = () => {
    popover.onClose();
    console.info('PRINT', row.id);
  };

  const handleShare = () => {
    popover.onClose();
    console.info('SHARE', row.id);
  };

  const handleDelete = () => {
    popover.onClose();
    console.info('DELETE', row.id);
  };

  return (
    <>
      {value === 0 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row.symbol}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.positions}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.buy_volume}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.buy_price}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.sell_volume}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.sell_price}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.net_volume}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.profit}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px', borderRight: 'none' }}>
            {row.unCovered}
          </StyledTableCell>
        </StyledTableRow>
      )}

      {value === 1 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row.asset}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.clients}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.coverage}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.nettotal}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>{row.rate}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.netTotal}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px' }}>
            {row.positive}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'right', padding: '9px', borderRight: 'none' }}>
            {row.graph}
          </StyledTableCell>
        </StyledTableRow>
      )}
      {value === 3 && (
        <StyledTableRow>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderLeft: 'none' }}>
            {row.time}
          </StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px' }}>{row.server}</StyledTableCell>
          <StyledTableCell sx={{ textAlign: 'left', padding: '9px', borderRight: 'none' }}>
            {row.message}
          </StyledTableCell>
        </StyledTableRow>
      )}

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={handleDownload}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>

        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
