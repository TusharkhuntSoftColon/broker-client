import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useBoolean } from 'src/hooks/use-boolean';

import BuySellDialog from 'src/components/custom-modal/buySellModal';
import { usePopover } from 'src/components/custom-popover';

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
  const { symbol, bid, ask, dailyChange, tp, swap, profit } = row;

  // console.log({ row });

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

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
          {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
          {index % 2 === 0 ? (
            <ArrowDropDownIcon sx={{ color: 'red', fontSize: '23px' }} />
          ) : (
            <ArrowDropUpIcon sx={{ color: 'green', fontSize: '23px' }} />
          )}
          {symbol}
          {/* <ListItemText
            primary={name}
            secondary={email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          /> */}
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

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{Domain}</TableCell> */}

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{company}</TableCell> */}

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell> */}

        {/* <TableCell>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {allowedExchange.map((_el: any) => (
              <Label variant="soft" color="default">
                {_el}
              </Label>
            ))}
          </Box>
        </TableCell> */}
      </TableRow>

      {/* <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      /> */}

      <BuySellDialog open={confirm.value} onClose={confirm.onFalse} row={row} />
    </>
  );
}
