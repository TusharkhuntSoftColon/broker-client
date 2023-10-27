import { Box } from '@mui/material';
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
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
  onViewRow,
}: Props) {
  const { name, role, exchange, phoneNumber, allowedExchange, ID, Domain } = row;
  console.log({ allowedExchange });

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected} onClick={() => onViewRow()} sx={{ cursor: 'pointer' }}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>
          {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}

          {name}
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

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{ID}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{Domain}</TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{company}</TableCell> */}

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{role}</TableCell> */}

        <TableCell>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {allowedExchange.map((_el: any) => (
              <Label variant="soft" color="default">
                {_el}
              </Label>
            ))}
          </Box>
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
