import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useBoolean } from 'src/hooks/use-boolean';

import BuySellDialog from 'src/components/custom-modal/buySellModal';

import { ITrade } from 'src/types/trade';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: ITrade;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
  index: any;
};

export default function SymbolLiveTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
  index,
}: Props) {
  const { symbol, bid, ask, dailyChange } = row;

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
            px: 0,
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
          }}
        >
          {index % 2 === 0 ? (
            <ArrowDropDownIcon sx={{ color: 'red', fontSize: '23px' }} />
          ) : (
            <ArrowDropUpIcon sx={{ color: 'green', fontSize: '23px' }} />
          )}
          {symbol}
        </TableCell>

        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            color: index % 2 === 0 ? 'blue' : 'red',
            textAlign: 'end',
          }}
        >
          {bid}
        </TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            color: index % 2 === 0 ? 'red' : 'blue',
            textAlign: 'end',
          }}
        >
          {ask}
        </TableCell>
        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            color: index % 2 === 0 ? 'blue' : 'red',
            textAlign: 'end',
          }}
        >
          {dailyChange}
        </TableCell>
      </TableRow>

      <BuySellDialog open={confirm.value} onClose={confirm.onFalse} row={row} />
    </>
  );
}
