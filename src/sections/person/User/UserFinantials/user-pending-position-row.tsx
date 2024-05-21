/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';

import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import adminService from 'src/services/adminService';

// ----------------------------------------------------------------------

interface UserPendingPostionTableRowProps {
  row: any;
  currentUser: any;
  openModel: any;
  setSelectedPendingOrder: any;
  getUserPendingPostionAPI: any;
}

export default function UserPendingPostionTableRow({
  row,
  openModel,
  setSelectedPendingOrder,
  currentUser,
  getUserPendingPostionAPI,
}: UserPendingPostionTableRowProps) {
  // for popover of close position
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { mutate: deletePendingPostion }: any = useMutation(adminService.deletePendingPostion, {
    onSuccess: (data: any) => {
      getUserPendingPostionAPI(currentUser?._id);
    },
    onError: (error: any) => {
      // if (isAxiosError(error)) {
      //   enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      // }
      enqueueSnackbar(error?.message, { variant: 'error' });
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    deletePendingPostion({ userId: currentUser?._id, orderId: row?._id });
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
          // openModel();
        }}
      >
        <TableCell sx={{ whiteSpace: 'nowrap' }} onClick={() => openModel()}>
          {row?.importMonthName}
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }} onClick={() => openModel()}>
          {row?.positionType}
        </TableCell>

        <TableCell onClick={() => openModel()}>{row?.quantity}</TableCell>

        <TableCell onClick={() => openModel()}>
          {row?.positionType === 'BUY' ? row?.buyPrice : row?.sellPrice}
        </TableCell>
        <TableCell onClick={() => openModel()}>{row?.livePrice}</TableCell>
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
        <TableCell>
          <IconButton sx={{ border: '1px solid', color: 'red' }} onClick={handleClick}>
            <Close sx={{ fontSize: '10px', color: 'red' }} />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
