/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button, IconButton, Popover, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import PendingPostionModalComponent from 'src/sections/overview/Dialog/PendingPositionModal';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

interface UserPendingPostionTableRowProps {
  row: any;
  openModel: any;
  setSelectedPendingOrder: any;
}

export default function UserPendingPostionTableRow({
  row,
  openModel,
  setSelectedPendingOrder,
}: UserPendingPostionTableRowProps) {
  // for popover of close position
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const id = open ? 'simple-popover' : undefined;

  const buyProfit =
    (row?.livePrice - row?.buyPrice) * row?.tickValue * row?.quantity * row?.calculationValue;

  const sellProfit =
    (row?.sellPrice - row?.livePrice) * row?.tickValue * row?.quantity * row?.calculationValue;

  return (
    <>
      <TableRow
        hover
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          setSelectedPendingOrder(row);
          openModel();
        }}
      >
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.importMonthName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.positionType}</TableCell>

        <TableCell>{row?.quantity}</TableCell>

        <TableCell>{row?.positionType === 'BUY' ? row?.buyPrice : row?.sellPrice}</TableCell>
        <TableCell>{row?.livePrice}</TableCell>
        {/* <TableCell
          sx={{
            color:
              row?.positionType === 'BUY' && buyProfit > 0
                ? 'blue'
                : 'red'
                  ? row?.positionType === 'SELL' && sellProfit > 0
                    ? 'blue'
                    : 'red'
                  : 'black',
          }}
        >
          {(row?.positionType === 'BUY' ? buyProfit : sellProfit).toFixed(2)}
        </TableCell> */}
      </TableRow>
    </>
  );
}
