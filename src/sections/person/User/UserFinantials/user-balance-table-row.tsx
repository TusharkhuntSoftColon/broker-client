/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-extraneous-dependencies */

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

// type Props = {
//   row: {
//     date: String;
//     type: String;
//     amount: any;
//     comment: String;
//   };
// };

export default function UserBalanceTableRow({ row }: any) {
  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell>{row?.date?.substr(0, 10)}</TableCell>

        <TableCell>{row?.operation}</TableCell>

        <TableCell>{row?.comment}</TableCell>
        <TableCell>{row?.amount}</TableCell>
      </TableRow>
    </>
  );
}
