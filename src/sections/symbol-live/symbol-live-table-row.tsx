/* eslint-disable no-nested-ternary */
/* eslint-disable no-constant-condition */
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
  const { symbol, bid, ask, dailyChange, oldBuyPrice, oldPercentage, oldSellPrice } = row;

  const confirm = useBoolean();
  const handleBidData = bid !== undefined && oldSellPrice !== undefined && bid > oldSellPrice;
  const handleAskData = ask !== undefined && oldBuyPrice !== undefined && ask > oldBuyPrice;
  const handlePercentageData =
    dailyChange !== undefined && oldPercentage !== undefined && dailyChange > oldPercentage;

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
          {handleBidData || handleAskData || handlePercentageData ? (
            <ArrowDropUpIcon sx={{ color: 'blue', fontSize: '23px' }} />
          ) : (
            <ArrowDropDownIcon sx={{ color: 'red', fontSize: '23px' }} />
          )}
          {symbol}
        </TableCell>

        <TableCell
          sx={{
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            color:
              bid !== undefined && oldSellPrice !== undefined
                ? bid > oldSellPrice
                  ? 'blue'
                  : bid === oldSellPrice
                    ? 'black'
                    : 'red'
                : 'red',
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
            color:
              ask !== undefined && oldBuyPrice !== undefined
                ? ask > oldBuyPrice
                  ? 'blue'
                  : ask === oldBuyPrice
                    ? 'black'
                    : 'red'
                : 'red',
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
            color:
              dailyChange !== undefined && oldPercentage !== undefined
                ? dailyChange > oldPercentage
                  ? 'blue'
                  : dailyChange === oldPercentage
                    ? 'black'
                    : 'red'
                : 'red',
            textAlign: 'end',
          }}
        >
          {`${dailyChange.toFixed(3)}%`}
        </TableCell>
      </TableRow>

      <BuySellDialog open={confirm.value} onClose={confirm.onFalse} row={row} />
    </>
  );
}
