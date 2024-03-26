/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

export default function UserTradeTableRow({ row }: any) {
  console.log({ row });

  const { symbolName, type, volume, price, livePrice, profit } = row;

  console.log({ row });

  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);

  console.log({ exchangeData });

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.importMonthName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{row?.positionType}</TableCell>

        <TableCell>{row?.quantity}</TableCell>

        <TableCell>{row?.positionType === 'BUY' ? row?.buyPrice : row?.sellPrice}</TableCell>
        <TableCell>{3500}</TableCell>
        <TableCell>{1500}</TableCell>
      </TableRow>
    </>
  );
}
