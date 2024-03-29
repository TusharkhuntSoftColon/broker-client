import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';

import Iconify from 'src/components/iconify';

import { IUserTableFilters, IUserTableFilterValue } from 'src/types/user';

// ----------------------------------------------------------------------

type Props = StackProps & {
  filters: IUserTableFilters;
  onFilters: (name: string, value: IUserTableFilterValue) => void;
  //
  onResetFilters: VoidFunction;
  //
  results: number;
};

export default function UserTableFiltersResult({
  filters,
  onFilters,
  //
  onResetFilters,
  //
  results,
  ...other
}: Props) {
  const handleRemoveStatus = () => {
    onFilters('status', null);
  };

  const handleRemoveExchange = (inputValue: string) => {
    const newValue = filters.exchange.filter((item: any) => item !== inputValue);
    onFilters('exchange', newValue);
  };

  const handleRemoveDate = () => {
    onFilters('dateRange', []);
  };

  const ExchangeList = useSelector((data: any) => data?.admin?.exchangeList);

  const matchedNames = filters?.exchange?.map(
    (id: any) => ExchangeList.find((item: any) => item._id === id)?.name
  );

  return (
    <Stack spacing={1.5} {...other}>
      <Box sx={{ typography: 'body2' }}>
        <strong>{results}</strong>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          results found
        </Box>
      </Box>

      <Stack flexGrow={1} spacing={1} direction="row" flexWrap="wrap" alignItems="center">
        {filters.status?.label?.length > 0 && (
          <Block label="Status:">
            <Chip size="small" label={filters.status?.label} onDelete={handleRemoveStatus} />
          </Block>
        )}

        {!!filters.exchange.length && (
          <Block label="Exchange:">
            {matchedNames.map((item: any) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveExchange(item)}
              />
            ))}
          </Block>
        )}

        {!!filters.dateRange.length && (
          <Block label="Selected Range:">
            {filters.dateRange.map((item: any) => (
              <Chip
                key={item}
                label={item.toDateString()}
                size="small"
                onDelete={() => handleRemoveDate()}
              />
            ))}
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
