/* eslint-disable react-hooks/exhaustive-deps */
import { isAxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import symbolService from 'src/services/symbolService';

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
  const { date, exchangeCode, symbol, bco, bcm, brkgRate, brkgRatePer, template } = row;

  const [Symbol, setSymbol] = useState<any>([]);
  const exchanges = useSelector((state: any) => state?.admin?.exchangeList);
  const ExchnageName = exchanges?.filter((data: any) => data?._id === exchangeCode)[0]?.name;
  const SymbolName = Symbol?.filter((data: any) => data?._id === symbol)[0]?.name;

  const { mutate: getSymbolList } = useMutation(symbolService.getSymbolList, {
    onSuccess: (data) => {
      setSymbol(data?.data?.rows);
    },
    onError: (error: any) => {
      if (isAxiosError(error)) {
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      }
    },
  });

  useEffect(() => {
    getSymbolList();
  }, []);

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
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{date.substring(0, 10) || '-'}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          <Label>{ExchnageName}</Label>
        </TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{SymbolName}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bco}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{bcm}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brkgRate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brkgRatePer}</TableCell>
        <TableCell align="right" sx={{ display: 'flex' }}>
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
