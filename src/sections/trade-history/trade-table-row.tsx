import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { useBoolean } from 'src/hooks/use-boolean';

import UpdateTradeDialog from 'src/components/custom-modal/updateTradeModal';

import { ITrade } from 'src/types/trade';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: ITrade;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
};

export default function TradeTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const { symbol, ticket, time, type, volume, price1, price2, swap, profit, sl, tp } = row;

  const confirm = useBoolean();

  return (
    <>
      <TableRow
        hover
        selected={selected}
        onClick={() => confirm.onTrue()}
        sx={{ cursor: 'pointer', borderBottom: '1px solid #e0e3eb' }}
      >
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '4px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '13px',
          }}
        >
          {symbol}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{ticket}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{time}</TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '13px',
            color: type === 'buy' ? 'blue' : 'red',
          }}
        >
          {type}
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{volume}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{price1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{sl}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{tp}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{price2}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap', py: '0px', fontSize: '13px' }}>{swap}</TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '13px',
            color: profit > 0 ? 'blue' : 'red',
          }}
        >
          {profit}
        </TableCell>
      </TableRow>

      <UpdateTradeDialog open={confirm.value} onClose={confirm.onFalse} row={row} isEdit />
    </>
  );
}
