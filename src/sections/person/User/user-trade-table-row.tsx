/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';

import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTradeTableRow({ row, closePosition }: any) {
  console.log({ row });
  // for popover of close position
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    closePosition(row);
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
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.importMonthName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.positionType}</TableCell>

        <TableCell>{row?.quantity}</TableCell>

        <TableCell>{row?.positionType === 'BUY' ? row?.buyPrice : row?.sellPrice}</TableCell>
        <TableCell>{row?.livePrice}</TableCell>
        <TableCell
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
        </TableCell>

        <TableCell>
          <IconButton sx={{ border: '1px solid', color: 'red' }} onClick={handleClick}>
            <Close sx={{ fontSize: '10px', color: 'red' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
