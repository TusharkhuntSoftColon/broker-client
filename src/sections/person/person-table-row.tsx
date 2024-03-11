/* eslint-disable import/no-extraneous-dependencies */
import { useSelector } from 'react-redux';

import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { useBoolean } from 'src/hooks/use-boolean';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { IUserItem } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  onEditRow: VoidFunction;
  row: IUserItem;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onViewRow: VoidFunction;
  onGetPersonRow: VoidFunction;
  index: number;
};

export default function PersonTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
  onGetPersonRow,
  index,
}: Props) {
  const { name, exchangeList, ID, isActive, role } = row;
  console.log({ row });

  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();
  const exchangeData = useSelector((data: any) => data?.admin?.exchangeList);

  return (
    <>
      <TableRow
        hover
        selected={selected}
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          onGetPersonRow();
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{index}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{`${ID} (${name})`}</TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {exchangeList.map((_el: any) => {
              const data = exchangeData?.filter((el: any) => el._id === _el.allowedExchange);
              return (
                <Label variant="soft" color="default">
                  {data && data[0]?.name}
                </Label>
              );
            })}
          </Box>
        </TableCell>

        <TableCell>
          <Label variant="soft" color={isActive ? 'success' : 'warning'}>
            {isActive === true ? 'Active' : 'In Active'}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="Edit" placement="top" arrow>
            <IconButton
              color={quickEdit.value ? 'inherit' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                onEditRow();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top" arrow>
            <IconButton
              color={popover.open ? 'inherit' : 'default'}
              onClick={(e) => {
                e.stopPropagation();
                confirm.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

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
