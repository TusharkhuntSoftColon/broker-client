/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

type Props = {
  row: {
    symbolName: String;
    type: String;
    volume: any;
    price: any;
    livePrice: any;
    profit: any;
  };
};

export default function UserTradeTableRow({ row }: Props) {
  console.log({ row });

  const { symbolName, type, volume, price, livePrice, profit } = row;

  console.log({ row });

  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);

  console.log({ exchangeData });

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{symbolName}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{type}</TableCell>

        <TableCell>{volume}</TableCell>

        <TableCell>{price}</TableCell>
        <TableCell>{livePrice}</TableCell>
        <TableCell>{profit}</TableCell>
      </TableRow>
    </>
  );
}
