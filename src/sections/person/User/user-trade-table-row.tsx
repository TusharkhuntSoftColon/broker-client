/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTradeTableRow({ row }: any) {
  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.importMonthName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.positionType}</TableCell>

        <TableCell>{row?.quantity}</TableCell>

        <TableCell>{row?.positionType === 'BUY' ? row?.buyPrice : row?.sellPrice}</TableCell>
        <TableCell>{row?.livePrice}</TableCell>
        <TableCell>
          {(row?.positionType === 'BUY'
            ? (row?.livePrice - row?.buyPrice) *
              row?.tickValue *
              row?.quantity *
              row?.calculationValue
            : (row?.sellPrice - row?.livePrice) *
              row?.tickValue *
              row?.quantity *
              row?.calculationValue
          ).toFixed(2)}
        </TableCell>
      </TableRow>
    </>
  );
}
