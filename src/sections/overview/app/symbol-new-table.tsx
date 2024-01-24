/* eslint-disable import/no-extraneous-dependencies */
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
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';

import { newSymbolTableData } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// ----------------------------------------------------------------------

type RowProps = {
  id: any;
  symbol: string;
  bid: number;
  ask: number;
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

export default function SymbolTableDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Symbols',
      value: 0,
      title: 'Symbol Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
      ],
    },
    {
      label: 'Details',
      value: 1,
      title: 'Details Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
      ],
    },
    {
      label: 'Ticks',
      value: 2,
      title: 'Ticks Table',
      tableDatas: newSymbolTableData,
      tableLabel: [
        { id: 'symbol', label: 'Symbol', align: 'left', border: '1px solid #dddddd !important' },
        { id: 'bid', label: 'Bid', align: 'right', border: '1px solid #dddddd !important' },
        { id: 'ask', label: 'Ask', align: 'right', border: '1px solid #dddddd !important' },
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
      <Box sx={{ margin: '5px', border: '1px solid #d3d3d3' }}>
        <Box>
          {tabs.map((data) => (
            <CustomTabPanel value={value} index={data.value} styles={{ overflow: 'hidden' }}>
              <CardHeader title={data.title} sx={{ mb: 4, mt: -1 }} />
              <TableContainer sx={{ overflow: 'unset', height: '400px' }}>
                <Scrollbar>
                  <Table stickyHeader>
                    <TableHeadCustom
                      sx={{ textAlign: 'right', border: '1px solid #dddddd' }}
                      headLabel={data.tableLabel}
                    />

                    <TableBody>
                      {data.tableDatas.map((row, index) => (
                        <SymbolNewRow key={row.id} row={row} index={index} value={value} />
                      ))}
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>
            </CustomTabPanel>
          ))}
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
              marginRight: 0, // Remove auto margin right for each tab
            },
          }}
        >
          {tabs.map((data: any) => (
            <Tab
              label={data.label}
              {...a11yProps(data.value)}
              sx={{
                // ml: 2,
                width: '20%',
                marginRight: '0px !important',
                borderTop: value === data.value ? 'none' : '1px solid #d3d3d3',
                borderLeft: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                borderRight: value === data.value ? 'none' : '0.5px solid #d3d3d3',
                // borderBottom: value === data.value ? '1px solid #d3d3d3' : '1px solid #d3d3d3',
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
              }}
            />
          ))}
        </Tabs>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

type SymbolNewRowProps = {
  row: RowProps;
  value?: any;
  index?: any;
};

function SymbolNewRow({ row, value, index }: SymbolNewRowProps) {
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
      <StyledTableRow>
        <StyledTableCell
          style={{
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '9px',
            borderLeft: 'none',
          }}
        >
          {index % 2 === 0 ? (
            <NorthEastIcon style={{ fontSize: '18px', color: 'green' }} />
          ) : (
            <SouthEastIcon style={{ fontSize: '18px', color: 'red' }} />
          )}
          {row.symbol}
        </StyledTableCell>
        <StyledTableCell
          style={{
            color: index % 2 === 0 ? 'blue' : 'red',
            textAlign: 'right',
            width: '40px',
            padding: '9px',
          }}
        >
          {row.bid}
        </StyledTableCell>
        <StyledTableCell
          style={{
            color: index % 2 === 0 ? 'blue' : 'red',
            textAlign: 'right',
            width: '40px',
            padding: '9px',
            borderRight: 'none',
          }}
        >
          {row.ask}
        </StyledTableCell>
      </StyledTableRow>

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
