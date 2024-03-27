/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTradeTableRow({ row }: any) {
  const { symbolName, type, volume, price, livePrice, profit } = row;

  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.importMonthName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.positionType}</TableCell>

        <TableCell>{row?.quantity}</TableCell>

        <TableCell>{row?.positionType === 'BUY' ? row?.buyPrice : row?.sellPrice}</TableCell>
        <TableCell>{row?.livePrice}</TableCell>
        <TableCell>{1500}</TableCell>
      </TableRow>
    </>
  );
}
