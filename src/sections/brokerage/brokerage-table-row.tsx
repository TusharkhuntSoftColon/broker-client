/* eslint-disable react-hooks/exhaustive-deps */

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label/label';

import { IBrokerage } from 'src/types/brokerage';

import Iconify from '../../components/iconify';
import { useBoolean } from '../../hooks/use-boolean';
import BrokerageQuickEditForm from './brokerage-edit-form';
import { usePopover } from '../../components/custom-popover';
import { ConfirmDialog } from '../../components/custom-dialog';

// ----------------------------------------------------------------------

type Props = {
  row: IBrokerage;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  exchangeList: any;
};

export default function BrokerageTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
  exchangeList,
}: Props) {
  const { date, exchangeName, symbolName, bco, bcm, brkgRate, brkgRatePer, template } = row;

  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{template}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{date?.substring(0, 10) || '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label>{exchangeName}</Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{symbolName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bco}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bcm}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brkgRate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brkgRatePer}</TableCell>
        <TableCell align="right" sx={{ display: 'flex' }}>
          <IconButton
            color={popover.open ? 'primary' : 'default'}
            onClick={() => {
              popover.onClose();

              confirm.onTrue();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
          <IconButton
            color={popover.open ? 'primary' : 'default'}
            onClick={() => {
              onEditRow();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </TableCell>
      </TableRow>

      <BrokerageQuickEditForm
        currentUser={row}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />

      <ConfirmDialog
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
      />
    </>
  );
}
