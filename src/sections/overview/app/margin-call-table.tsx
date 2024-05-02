import React from 'react';

import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import { newMarginCallTableData } from 'src/_mock';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// ----------------------------------------------------------------------

type RowProps = {
  id: any;
  login: string;
  level: string;
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

export default function MarginCallTableDashboard() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabs = [
    {
      label: 'Margin Call',
      value: 0,
      title: 'Margin Calls Table',
      tableDatas: newMarginCallTableData,
      tableLabel: [
        {
          id: 'login',
          label: 'Login',
          align: 'left',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '0px 5px',
        },
        {
          id: 'level',
          label: 'Level',
          align: 'right',
          border: '1px solid #dddddd !important',
          fontSize: '13px',
          padding: '0px 5px',
        },
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
        [theme.breakpoints.down(1800)]: {
          height: '49vh',
        },

        [theme.breakpoints.up(1600)]: {
          height: '53vh',
        },
      }}
    >
      <Box sx={{ margin: '5px', fontSize: '13px', border: '1px solid #d3d3d3', height: '98%' }}>
        <Box>
          {tabs.map((data) => (
            <CustomTabPanel
              key={data?.value}
              value={value}
              index={data.value}
              styles={{ overflow: 'hidden' }}
            >
              <CardHeader title={data.title} sx={{ padding: '5px !important' }} />
              <TableContainer
                sx={{
                  overflow: 'unset',
                  height: { md: '35vh', xl: '40vh' },
                  maxHeight: { md: '35vh', xl: '40vh' },
                }}
              >
                <Scrollbar>
                  <Table stickyHeader>
                    <TableHeadCustom
                      sx={{ textAlign: 'right', padding: 0, border: '1px solid #dddddd' }}
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
        {/* <Tabs
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
              key={data.value}
              label={data.label}
              {...a11yProps(data.value)}
              sx={{
                // ml: 2,
                width: '50%',
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
        </Tabs> */}
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
            gap: '1px',
            padding: '5px',
            fontSize: '13px',
            borderLeft: 'none',
            borderBottom: 'none',
          }}
        >
          {row.login}
        </StyledTableCell>
        <StyledTableCell
          style={{
            textAlign: 'right',
            padding: '5px',
            fontSize: '13px',
            borderRight: 'none',
            borderBottom: 'none',
          }}
        >
          {row.level}
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
