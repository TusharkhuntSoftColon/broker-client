/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

type Props = {
  row: {
    date: String;
    type: String;
    amount: any;
    comment: String;
  };
};

export default function UserBalanceTableRow({ row }: Props) {
  console.log({ row });

  const { date, type, amount, comment } = row;

  console.log({ row });

  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);

  console.log({ exchangeData });

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell>{date}</TableCell>

        <TableCell>{type}</TableCell>

        <TableCell>{comment}</TableCell>
        <TableCell>{amount}</TableCell>
      </TableRow>
    </>
  );
}
