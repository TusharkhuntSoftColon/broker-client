/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-nested-ternary */
import { useState } from 'react';

import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import { Box, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

// ----------------------------------------------------------------------

const CustomtextFields = styled(TextField)`
fontSize: '20px',
'& .MuiOutlinedInput-root': {
  '& fieldset': {
    border: 'none', // Remove the default border
  },
},
`;

export default function BuySellDialog({
  title,
  row,
  content,
  action,
  open,
  onClose,
  isEdit,
  ...other
}: any) {
  const [type, setType] = useState('instant-execution');
  const [expiration, setExpiration] = useState('gtc');
  const [value, setValue] = useState({
    volume: isEdit ? row?.volume : 0,
    price: isEdit ? row?.price1 : 0,
    stopLimitPrice: 0,
    stopLoss: null,
    takeProfit: null,
    comment: '',
  });

  // const { mutate } = useMutation(tradeService.buyShare, {
  //   onSuccess: (data: any) => {
  //     console.log(data);
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //   },
  // });

  const dummyTypes = [
    { label: 'Instant Execution', value: 'instant-execution' },
    { label: 'Buy Limit', value: 'buy-limit' },
    { label: 'Sell Limit', value: 'sell-limit' },
    { label: 'Buy Stop', value: 'buy-stop' },
    { label: 'Sell Stop', value: 'sell-stop' },
    { label: 'Buy Stop Limit', value: 'buy-stop-limit' },
    { label: 'Sell Stop Limit', value: 'sell-stop-limit' },
  ];

  const expirationData = [
    { label: 'GTC', value: 'gtc' },
    { label: 'Today', value: 'today' },
    { label: 'Specified', value: 'specified' },
    { label: 'Specified Day', value: 'specified-day' },
  ];

  const handleMinusClick = (field: any) => {
    setValue((prevState: any) => ({
      ...prevState,
      [field]: Number(prevState[field]) - 1 >= 0 ? Number(prevState[field]) - 1 : 0,
    }));
  };

  const handleStopLossMinus = (field: any) => {
    const decreaseAmount = 0.01 * (row?.bid || 0);

    setValue((prevState: any) => ({
      ...prevState,
      [field]: prevState[field] != null ? prevState[field] - 0.01 : row?.bid - decreaseAmount,
    }));
  };

  const handleStopLossPlus = (field: any) => {
    const increaseAmount = 0.01 * (row?.bid || 0);

    setValue((prevState: any) => ({
      ...prevState,
      [field]: prevState[field] != null ? prevState[field] + 0.01 : row?.bid + increaseAmount,
    }));
  };

  const handleProfitMinus = (field: any) => {
    const decreaseAmount = 0.01 * (row?.ask || 0);

    setValue((prevState: any) => ({
      ...prevState,
      [field]: prevState[field] != null ? prevState[field] + 0.01 : row?.ask + decreaseAmount,
    }));
  };

  const handleProfitPlus = (field: any) => {
    const increaseAmount = 0.01 * (row?.ask || 0);

    setValue((prevState: any) => ({
      ...prevState,
      [field]: row?.ask + increaseAmount >= 0 ? row?.ask + increaseAmount : 0,
    }));
  };

  const handlePlusClick = (field: any) => {
    setValue((prevState: any) => ({
      ...prevState,
      [field]: Number(prevState[field]) + 1,
    }));
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value, // Update the specified property dynamically
    }));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    setExpiration('gtc');
  };

  const handleExpirationChange = (event: SelectChangeEvent) => {
    setExpiration(event.target.value as string);
  };

  const handleSellClick = () => {
    console.log('Sell Clicked');
    console.log('Type:', type);
    console.log('Exp:', expiration);
    console.log('Values:', value);
    console.log('bid', row?.bid);
    // onClose();
  };

  const handleBuyClick = () => {
    console.log('Buy Clicked');
    console.log('Type:', type);
    console.log('Exp:', expiration);
    console.log('Values:', value);
    console.log('bid', row?.ask);
    // onClose();
  };

  // useEffect(() => {
  //   // mutate()
  // }, []);

  return (
    <Dialog
      sx={{
        '.MuiModal-backdrop': {
          background: 'transparent',
        },
      }}
      fullWidth
      maxWidth="xs"
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          // Example styles to change position
          position: 'absolute',
          top: '60px',
          left: '20px',
          // You can adjust these values as needed
        },
      }}
      {...other}
    >
      {/* <DialogTitle sx={{ pb: 5 }}>{title}</DialogTitle> */}

      <DialogContent sx={{ typography: 'body2', gap: 3, py: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #e8e8e8',
            justifyContent: 'space-between',
          }}
        >
          {isEdit ? (
            <Box
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                fontSize: '14px',
                marginLeft: '10px',
                color: row.type === 'sell' ? 'red' : 'blue',
              }}
            >{`#${row?.ticket} ${row?.type} ${row?.volume} ${row?.symbol} ${row?.price1}`}</Box>
          ) : (
            <FormControl
              fullWidth
              sx={{
                '& .MuiSelect-root': {
                  borderRadius: '0px !important', // Remove the border radius
                },
              }}
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                onChange={handleChange}
                inputProps={{
                  sx: {
                    fontSize: '14px', // Increase the font size to 20px or any desired size
                    fontWeight: 500,
                    borderRadius: '0px',
                    fontFamily: '"Trebuchet MS", "Roboto", "Ubuntu", "sans-serif"',
                    color: type.includes('buy') ? 'blue' : type.includes('sell') ? 'red' : '',
                  },
                }}
                style={{ fontSize: '18px', borderRadius: '0px' }}
              >
                {dummyTypes.map((data: any) => (
                  <MenuItem sx={{ fontSize: '14px' }} key={data?.value} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Box
            sx={{
              padding: '8px',
              '&:hover': {
                backgroundColor: '#f1f9ff',
              },
            }}
          >
            <CloseIcon
              sx={{ fontSize: '22px', mt: 1, color: '#3183ff', cursor: 'pointer' }}
              onClick={onClose}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 1, display: type !== 'instant-execution' ? 'flex' : '', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Volume</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>1.00 00 GBP</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ border: '1px solid #e8e8e8' }}>
              <Button onClick={() => handleMinusClick('volume')} sx={{ fontSize: '24px' }}>
                -
              </Button>
              <CustomtextFields
                type="number"
                fullWidth
                value={value.volume}
                onChange={handleInputChange}
                //   style={{ margin: '0 10px' }}
                name="volume"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none', // Remove the default border
                    },
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: '14px', // Increase the font size to 20px or any desired size
                    textAlign: 'center',
                    fontWeight: 600,
                  },
                }}
              />
              <Button onClick={() => handlePlusClick('volume')} sx={{ fontSize: '24px' }}>
                +
              </Button>
            </Box>
          </Box>
          {type !== 'instant-execution' && (
            <Box>
              <Box sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Price</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                sx={{ border: '1px solid #e8e8e8', backgroundColor: isEdit ? '#f4f5f6' : '' }}
              >
                <Button
                  onClick={() => handleMinusClick('price')}
                  sx={{ fontSize: '24px' }}
                  disabled={isEdit}
                >
                  -
                </Button>
                <CustomtextFields
                  type="number"
                  fullWidth
                  disabled={isEdit}
                  value={value.price}
                  onChange={handleInputChange}
                  //   style={{ margin: '0 10px' }}
                  name="price"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none', // Remove the default border
                      },
                    },
                  }}
                  inputProps={{
                    style: {
                      fontSize: '14px', // Increase the font size to 20px or any desired size
                      textAlign: 'center',
                      fontWeight: 600,
                    },
                  }}
                />
                <Button
                  onClick={() => handlePlusClick('price')}
                  sx={{ fontSize: '24px' }}
                  disabled={isEdit}
                >
                  +
                </Button>
              </Box>
            </Box>
          )}
        </Box>
        {(type === 'buy-stop-limit' || type === 'sell-stop-limit') && (
          <Box sx={{ mt: 1 }}>
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Stop Limit Price</Typography>
            </Box>
            <Box display="flex" alignItems="center" sx={{ border: '1px solid #e8e8e8' }}>
              <Button onClick={() => handleMinusClick('stopLimitPrice')} sx={{ fontSize: '24px' }}>
                -
              </Button>
              <CustomtextFields
                type="number"
                fullWidth
                value={value.stopLimitPrice}
                onChange={handleInputChange}
                //   style={{ margin: '0 10px' }}
                name="stopLimitPrice"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none', // Remove the default border
                    },
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: '14px', // Increase the font size to 20px or any desired size
                    textAlign: 'center',
                    fontWeight: 600,
                  },
                }}
              />
              <Button onClick={() => handlePlusClick('stopLimitPrice')} sx={{ fontSize: '24px' }}>
                +
              </Button>
            </Box>
          </Box>
        )}
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box>
            <Typography sx={{ mb: 1 }}>Stopp Loss</Typography>
            <Box display="flex" alignItems="center" sx={{ border: '1px solid #e8e8e8' }}>
              <Button onClick={() => handleStopLossMinus('stopLoss')} sx={{ fontSize: '24px' }}>
                -
              </Button>
              <CustomtextFields
                type="number"
                fullWidth
                name="stopLoss"
                value={value?.stopLoss}
                onChange={handleInputChange}
                //   style={{ margin: '0 10px' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none', // Remove the default border
                    },
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: '14px', // Increase the font size to 20px or any desired size
                    padding: '0px',
                    textAlign: 'center',
                    fontWeight: 600,
                  },
                }}
              />
              <Button onClick={() => handleStopLossPlus('stopLoss')} sx={{ fontSize: '24px' }}>
                +
              </Button>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: 1 }}>Take Profit</Typography>
            <Box display="flex" alignItems="center" sx={{ border: '1px solid #e8e8e8' }}>
              <Button onClick={() => handleProfitMinus('takeProfit')} sx={{ fontSize: '24px' }}>
                -
              </Button>
              <CustomtextFields
                type="number"
                fullWidth
                value={value?.takeProfit}
                name="takeProfit"
                onChange={handleInputChange}
                //   style={{ margin: '0 10px' }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none', // Remove the default border
                    },
                  },
                }}
                inputProps={{
                  style: {
                    fontSize: '14px', // Increase the font size to 20px or any desired size
                    textAlign: 'center',
                    fontWeight: 600,
                    padding: '0px',
                  },
                }}
              />
              <Button onClick={() => handleProfitPlus('takeProfit')} sx={{ fontSize: '24px' }}>
                +
              </Button>
            </Box>
          </Box>
        </Box>
        {type !== 'instant-execution' && !isEdit && (
          <Box sx={{ mt: 1 }}>
            <FormControl
              fullWidth
              sx={{
                '& .MuiSelect-root': {
                  borderRadius: '0px !important', // Remove the border radius
                },
              }}
            >
              <Typography sx={{ mb: 1 }}>Expiration</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={expiration}
                onChange={handleExpirationChange}
                inputProps={{
                  sx: {
                    fontSize: '14px', // Increase the font size to 20px or any desired size
                    fontWeight: 500,
                    borderRadius: '0px',
                    fontFamily: '"Trebuchet MS", "Roboto", "Ubuntu", "sans-serif"',
                  },
                }}
              >
                {expirationData.map((data: any) => (
                  <MenuItem sx={{ fontSize: '14px' }} value={data.value}>
                    {data.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {expiration.includes('specified') && type !== 'instant-execution' && (
          <Box sx={{ mt: 1 }}>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Typography>Expiration Date</Typography>
              <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                {expiration === 'specified' ? (
                  <DateTimePicker
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                  />
                ) : (
                  <DatePicker />
                )}
              </DemoContainer>
            </LocalizationProvider> */}
          </Box>
        )}

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ mb: 1 }}>Comment</Typography>
          <CustomtextFields
            type="text"
            fullWidth
            disabled={isEdit}
            value={value.comment}
            name="comment"
            onChange={handleInputChange}
            //   style={{ margin: '0 10px' }}
            sx={{
              borderRadius: '0px',
              backgroundColor: isEdit ? '#f4f5f6' : '',
            }}
            inputProps={{
              style: {
                fontSize: '14px', // Increase the font size to 20px or any desired size
                fontWeight: 600,
              },
            }}
          />
        </Box>

        {type === 'instant-execution' ? (
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Typography
                sx={{
                  backgroundColor: '#f1f9ff',
                  p: 1,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color:
                    row?.bid !== undefined && row?.oldBuyPrice !== undefined
                      ? row?.bid > row?.oldBuyPrice
                        ? 'blue'
                        : row?.bid === row?.oldBuyPrice
                          ? 'black'
                          : 'red'
                      : 'red',
                }}
              >
                {row?.bid ?? '0'}
              </Typography>
              <Typography
                sx={{
                  backgroundColor: '#f1f9ff',
                  p: 1,
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  color:
                    row?.ask !== undefined && row?.oldSellPrice !== undefined
                      ? row?.ask > row?.oldSellPrice
                        ? 'blue'
                        : row?.ask === row?.oldSellPrice
                          ? 'black'
                          : 'red'
                      : 'red',
                }}
              >
                {row?.ask ?? '0'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <Button
                sx={{
                  width: '100%',
                  backgroundColor: '#f45959',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#f45959',
                  },
                  borderRadius: '0px',
                  padding: '8px 12px',
                }}
                onClick={handleSellClick}
              >
                Sell
              </Button>
              <Button
                sx={{
                  width: '100%',
                  backgroundColor: '#4b93ff',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#4b93ff',
                  },
                  borderRadius: '0px',
                  padding: '8px 12px',
                }}
                onClick={handleBuyClick}
              >
                Buy
              </Button>
            </Box>
          </Box>
        ) : (
          <Button
            sx={{
              width: '100%',
              backgroundColor: '#4b93ff',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4b93ff',
              },
              borderRadius: '0px',
              padding: '8px 12px',
              mt: 2,
            }}
            onClick={handleBuyClick}
          >
            {isEdit ? 'Modify' : 'Place Order'}
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
