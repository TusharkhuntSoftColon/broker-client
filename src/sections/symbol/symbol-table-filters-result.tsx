import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

import Iconify from 'src/components/iconify';
import { shortDateLabel } from 'src/components/custom-date-range-picker';
import { ISymbolTableFilterValue, ISymbolTableFilters } from 'src/types/symbol';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: ISymbolTableFilters;
  onFilters: (name: string, value: ISymbolTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function SymbolTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  console.log({ filters });

  const handleRemoveStatus = () => {
    onFilters('status', null);
  };

  const handleRemoveCurrency = () => {
    onFilters('currency', null);
  };

  const handleRemoveTickSize = () => {
    onFilters('tickSize', null);
  };

  const handleRemoveDate = () => {
    onFilters('startDate', null);
    onFilters('endDate', null);
  };

  console.log({ filters });

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters?.currency !== null && (
          <Block label="Currency :">
            <Chip size="small" label={filters?.currency?.label} onDelete={handleRemoveCurrency} />
          </Block>
        )}

        {filters?.tickSize !== null && (
          <Block label="Tick Size :">
            <Chip size="small" label={filters?.tickSize?.label} onDelete={handleRemoveTickSize} />
          </Block>
        )}

        {filters?.status !== null && (
          <Block label="Status :">
            <Chip size="small" label={filters?.status?.label} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {filters.startDate && filters.endDate && (
          <Block label="Date:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} />
          </Block>
        )}

        <Button
          color="error"
          onClick={onResetFilters}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type BlockProps = StackProps & {
  label: string;
};

function Block({ label, children, sx, ...other }: BlockProps) {
  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      direction="row"
      sx={{
        p: 1,
        borderRadius: 1,
        overflow: 'hidden',
        borderStyle: 'dashed',
        ...sx,
      }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'subtitle2' }}>
        {label}
      </Box>

      <Stack spacing={1} direction="row" flexWrap="wrap">
        {children}
      </Stack>
    </Stack>
  );
}
