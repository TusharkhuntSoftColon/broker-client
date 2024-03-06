/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */

/* eslint-disable no-constant-condition */
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useBoolean } from 'src/hooks/use-boolean';

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
  const handleBidData = bid !== undefined && oldBuyPrice !== undefined && bid > oldBuyPrice;
  const handleAskData = ask !== undefined && oldSellPrice !== undefined && ask > oldSellPrice;
  const handlePercentageData =
    dailyChange !== undefined && oldPercentage !== undefined && dailyChange > oldPercentage;

  return (
    <>
      <TableRow
        hover
        selected={selected}
        onClick={() => {
          confirm.onTrue();
        }}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell
          sx={{
            lineHeight: '2.1',
            whiteSpace: 'nowrap',
            py: '4px',
            px: 0,
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
            borderBottom: '0 !important',
            color: 'black',
            fontWeight: '500',
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
            fontweight: '200',
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            height: '2rem',
            lineHeight: '2.1',
            borderBottom: '0 !important',
            color:
              bid !== undefined && oldBuyPrice !== undefined
                ? bid > oldBuyPrice
                  ? 'blue'
                  : bid === oldBuyPrice
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
            fontweight: '200',
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            borderBottom: '0 !important',
            lineHeight: '2.1',
            color:
              ask !== undefined && oldSellPrice !== undefined
                ? ask > oldSellPrice
                  ? 'blue'
                  : ask === oldSellPrice
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
            fontweight: '200',
            whiteSpace: 'nowrap',
            py: '0px',
            fontSize: '14px',
            borderBottom: '0 !important',
            lineHeight: '2.1',
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
    </>
  );
}
