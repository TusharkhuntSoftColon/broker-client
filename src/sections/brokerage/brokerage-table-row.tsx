
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { IBrokerage } from 'src/types/brokerage';

import Iconify from '../../components/iconify';
import { useBoolean } from '../../hooks/use-boolean';
import BrokerageQuickEditForm from './brokerage-edit-form';
import { ConfirmDialog } from '../../components/custom-dialog';
import CustomPopover, { usePopover } from '../../components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  row: IBrokerage;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function BrokerageTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}: Props) {
  const { date, exchangeCode, symbol, brokerage_call_option, brokerage_call_method, brokerage_rate ,brokerage_per} = row;

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const popover = usePopover();

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")}</TableCell> */}
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{date}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{exchangeCode}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{symbol}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brokerage_call_option}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brokerage_call_method}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brokerage_rate}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{brokerage_per}</TableCell>
        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>{s}</TableCell> */}

        {/* <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={name}
            src={coverUrl}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />

          <ListItemText
            disableTypography
            primary={
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {name}
              </Link>
            }
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {category}
              </Box>
            }
          />
        </TableCell> */}

        {/* <TableCell>
          <ListItemText
            primary={<span>{createdAt || '-'}</span>}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={<span>{updatedAt || '-'}</span>}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <Label variant="soft" color={isActiveExchange ? 'success' : 'warning'}>
            {isActiveExchange === true ? 'Active' : 'In Active'}
          </Label>
        </TableCell> */}

        {/*         <TableCell sx={{ typography: 'caption', color: 'text.secondary' }}>
          <LinearProgress
            value={(available * 100) / quantity}
            variant="determinate"
            color={
              (inventoryType === 'out of stock' && 'error') ||
              (inventoryType === 'low stock' && 'warning') ||
              'success'
            }
            sx={{ mb: 1, height: 6, maxWidth: 80 }}
          />
          {!!available && available} {inventoryType}
        </TableCell>

        <TableCell>{fCurrency(price)}</TableCell>

        <TableCell>
          <Label variant="soft" color={(publish === 'published' && 'info') || 'default'}>
            {publish}
          </Label>
        </TableCell> */}

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
          <IconButton color={popover.open ? 'primary' : 'default'} onClick={quickEdit.onTrue}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </TableCell>
      </TableRow>

      <BrokerageQuickEditForm currentUser={row} open={quickEdit.value} onClose={quickEdit.onFalse} />

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

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
              confirm.onFalse;
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
