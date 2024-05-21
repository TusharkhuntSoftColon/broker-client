import React from 'react';

import { Box, Select, MenuItem, InputLabel, IconButton, FormControl } from '@mui/material';

import { EXCHANGE_GROUP } from 'src/_mock';

import Iconify from 'src/components/iconify';

interface LabelValueInterface {
  label: string;
  value: string;
}

export interface AllowedExChangeInterface {
  allowedExchange: string;
  exchangeGroup: string;
  index: string;
}

interface AllowedExchangeComponentProps extends AllowedExChangeInterface {
  Exchange: LabelValueInterface[];
  handleChange: (index: string, event: any) => void;
  fields: AllowedExChangeInterface[];
  handleRemoveExchange: (index: string) => void;
  loggedPersonData: any;
}

const AllowedExchangeComponent = ({
  allowedExchange,
  exchangeGroup,
  Exchange,
  index,
  handleChange,
  fields,
  loggedPersonData,
  handleRemoveExchange,
}: AllowedExchangeComponentProps) => {
  const filteredExchangeGroup = React.useMemo(() => {
    const selectedExchange = loggedPersonData?.exchangeList?.find(
      (data: any) => data.allowedExchange === allowedExchange
    );
    const selectedExchangeGroup = EXCHANGE_GROUP.find(
      (group) => group.value === selectedExchange?.exchangeGroup
    );

    if (selectedExchangeGroup) {
      return EXCHANGE_GROUP.filter((group) => group.value <= selectedExchangeGroup.value);
    }
    return [];
  }, [allowedExchange, Exchange, loggedPersonData]);

  return (
    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id={`allowedExchange-label-${index}`}>Allowed Exchange</InputLabel>
        <Select
          name="allowedExchange"
          labelId={`allowedExchange-label-${index}`}
          label="Allowed Exchange"
          sx={{ width: '100%' }}
          value={allowedExchange}
          onChange={(event) => handleChange(index, event)}
        >
          {Exchange.map((option) => {
            // Check if the current option's value is selected in any of the fields
            const isOptionSelected = fields.some((field) => field.allowedExchange === option.value);
            return (
              <MenuItem key={option.value} value={option.value} disabled={isOptionSelected}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id={`exchangeGroup-label-${index}`}>Exchange Group</InputLabel>
        <Select
          name="exchangeGroup"
          label="Exchange Group"
          sx={{ width: '100%' }}
          value={exchangeGroup}
          onChange={(event) => handleChange(index, event)}
        >
          {filteredExchangeGroup?.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {fields.length > 1 && (
        <IconButton
          disabled={fields.length <= 1}
          sx={{ height: '50px', width: '50px' }}
          onClick={() => handleRemoveExchange(index)}
        >
          <Iconify icon="solar:trash-bin-trash-bold" sx={{ color: 'red' }} />
        </IconButton>
      )}
    </Box>
  );
};

export default AllowedExchangeComponent;
