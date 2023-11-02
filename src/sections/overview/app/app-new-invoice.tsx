import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Card, { CardProps } from '@mui/material/Card';
import TableContainer from '@mui/material/TableContainer';

import { fCurrency } from 'src/utils/format-number';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { _appInvoices, newInvoiceData } from 'src/_mock';
import React from 'react';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  tableData: RowProps[];
  tableLabels: any;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  styles: any;
}

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
        { id: 'symbol', label: 'Symbol' },
        { id: 'positions', label: 'Positions' },
        { id: 'buy_volume', label: 'Buy Volume' },
        { id: 'buy_price', label: 'Buy Price' },
        { id: 'sell_volume', label: 'Sell Volume' },
        { id: 'sell_price', label: 'Sell Price' },
        { id: 'net_volume', label: 'Net Volume' },
        { id: 'profit', label: 'Profit (INR)' },
        { id: 'unCovered', label: 'Uncovered (INR)' },
      ],
    },
    {
      label: 'Exposure',
      value: 1,
      title: 'New Invoice 2',
      tableDatas: newInvoiceData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol' },
        { id: 'positions', label: 'Positions' },
        { id: 'buy_volume', label: 'Buy Volume' },
        { id: 'buy_price', label: 'Buy Price' },
        { id: 'sell_volume', label: 'Sell Volume' },
        { id: 'sell_price', label: 'Sell Price' },
        { id: 'net_volume', label: 'Net Volume' },
        { id: 'profit', label: 'Profit (INR)' },
        { id: 'unCovered', label: 'Uncovered (INR)' },
      ],
    },
    {
      label: 'News',
      value: 2,
      title: 'New Invoice 3',
      tableDatas: newInvoiceData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol' },
        { id: 'positions', label: 'Positions' },
        { id: 'buy_volume', label: 'Buy Volume' },
        { id: 'buy_price', label: 'Buy Price' },
        { id: 'sell_volume', label: 'Sell Volume' },
        { id: 'sell_price', label: 'Sell Price' },
        { id: 'net_volume', label: 'Net Volume' },
        { id: 'profit', label: 'Profit (INR)' },
        { id: 'unCovered', label: 'Uncovered (INR)' },
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
              <CustomTabPanel value={value} index={data.value} styles={{ overflow: 'hidden' }}>
                <CardHeader title={data.title} sx={{ mb: 4, mt: -1 }} />
                <TableContainer sx={{ overflow: 'unset', height: '400px' }}>
                  <Scrollbar>
                    <Table stickyHeader sx={{ minWidth: 680 }}>
                      <TableHeadCustom headLabel={data.tableLabel} />
                      <TableBody>
                        {data.tableDatas.map((row) => (
                          <AppNewInvoiceRow key={row.id} row={row} />
                        ))}
                      </TableBody>
                    </Table>
                  </Scrollbar>
                </TableContainer>

                <Divider sx={{ borderStyle: 'dashed' }} />
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
                  width: '10%',
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
  row: RowProps;
};

function AppNewInvoiceRow({ row }: AppNewInvoiceRowProps) {
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
      <TableRow>
        <TableCell>{row.symbol}</TableCell>
        <TableCell>{row.positions}</TableCell>
        <TableCell>{row.buy_volume}</TableCell>
        <TableCell>{row.buy_price}</TableCell>
        <TableCell>{row.sell_volume}</TableCell>
        <TableCell>{row.sell_price}</TableCell>
        <TableCell>{row.net_volume}</TableCell>
        <TableCell>{row.profit}</TableCell>
        <TableCell>{row.unCovered}</TableCell>
      </TableRow>

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
