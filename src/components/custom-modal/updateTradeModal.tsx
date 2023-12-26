import { useState } from 'react';

import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import { Box, Select, MenuItem, FormControl, SelectChangeEvent } from '@mui/material';

// import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

const CustomtextFields = styled(TextField)`
fontSize: '20px',
'& .MuiOutlinedInput-root': {
  '& fieldset': {
    border: 'none', // Remove the default border
  },
},
`;

export default function UpdateTradeDialog({
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
  const [value1, setValue1] = useState({
    volume: isEdit ? row?.volume : 0,
    price: isEdit ? row?.price1 : 0,
    stopLimitPrice: 0,
    stopLoss: 0,
    takeProfit: 0,
    comment: '',
  });
  const [isModified, setIsModified] = useState(false);

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
    setValue1((prevState: any) => ({
      ...prevState,
      [field]: Number(prevState[field]) - 1 >= 0 ? Number(prevState[field]) - 1 : 0,
    }));
  };

  const handlePlusClick = (field: any) => {
    setValue1((prevState: any) => ({
      ...prevState,
      [field]: Number(prevState[field]) + 1,
    }));
  };

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setValue1((prevState) => ({
      ...prevState,
      [name]: value, // Update the specified property dynamically
    }));

    if (value[name] !== value) {
      setIsModified(true); // Enable the Modify button
    } else {
      setIsModified(false); // Disable the Modify button
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
    setExpiration('gtc');
  };

  const handleExpirationChange = (event: SelectChangeEvent) => {
    setExpiration(event.target.value as string);
  };

  const handleSellClick = () => {
    // console.log('Sell Clicked');

    onClose();
  };

  const handleModifyClick = () => {
    // console.log('Buy Clicked');

    onClose();
  };
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
                  <MenuItem sx={{ fontSize: '14px' }} value={data.value}>
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
        <Box sx={{ mt: 1, display: 'flex', gap: 2 }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Volume</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>1.00 00 GBP</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{ border: '1px solid #e8e8e8', backgroundColor: '#f4f5f6' }}
            >
              {/* <Button disabled={isEdit} sx={{ fontSize: '24px' }}>
                -
              </Button> */}
              <Box
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                -
              </Box>
              <CustomtextFields
                type="number"
                fullWidth
                disabled={isEdit}
                value={value1.volume}
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
              {/* <Button disabled={isEdit} sx={{ fontSize: '24px' }}>
                +
              </Button> */}
              <Box
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                +
              </Box>
            </Box>
          </Box>
          <Box>
            <Box sx={{ mb: 1 }}>
              <Typography sx={{ fontSize: '12px', fontWeight: 500 }}>Price</Typography>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              sx={{ border: '1px solid #e8e8e8', backgroundColor: '#f4f5f6' }}
            >
              {/* <Button
                onClick={() => handleMinusClick('price')}
                sx={{ fontSize: '24px', width: '10%' }}
              >
                -
              </Button> */}
              <Box
                onClick={() => handleMinusClick('price')}
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                -
              </Box>
              <CustomtextFields
                type="number"
                fullWidth
                disabled
                value={value1.price}
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
              {/* <Button onClick={() => handlePlusClick('price')} sx={{ fontSize: '24px' }}>
                +
              </Button> */}
              <Box
                onClick={() => handlePlusClick('price')}
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                +
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Box>
            <Typography sx={{ mb: 1 }}>Stopp Loss</Typography>
            <Box display="flex" alignItems="center" sx={{ border: '1px solid #e8e8e8' }}>
              {/* <Button onClick={() => handleMinusClick('stopLoss')} sx={{ fontSize: '24px' }}>
                -
              </Button> */}
              <Box
                onClick={() => handleMinusClick('stopLoss')}
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                -
              </Box>
              <CustomtextFields
                type="number"
                fullWidth
                name="stopLoss"
                value={value1.stopLoss}
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
                  },
                }}
              />
              {/* <Button
                onClick={() => handlePlusClick('stopLoss')}
                sx={{ fontSize: '24px', padding: 0 }}
              >
                +
              </Button> */}
              <Box
                onClick={() => handlePlusClick('stopLoss')}
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                +
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ mb: 1 }}>Take Profit</Typography>
            <Box display="flex" alignItems="center" sx={{ border: '1px solid #e8e8e8' }}>
              {/* <Button onClick={() => handleMinusClick('takeProfit')} sx={{ fontSize: '24px' }}>
                -
              </Button> */}
              <Box
                onClick={() => handleMinusClick('takeProfit')}
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                -
              </Box>
              <CustomtextFields
                type="number"
                fullWidth
                value={value1.takeProfit}
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
                  },
                }}
              />
              {/* <Button onClick={() => handlePlusClick('takeProfit')} sx={{ fontSize: '24px' }}>
                +
              </Button> */}
              <Box
                onClick={() => handlePlusClick('takeProfit')}
                sx={{
                  fontSize: '24px',
                  px: 2,
                  cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: '#919eab14',
                  //   },
                }}
              >
                +
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ mb: 1 }}>Comment</Typography>
          <CustomtextFields
            type="text"
            fullWidth
            disabled={isEdit}
            value={value1.comment}
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
          onClick={handleModifyClick}
        >
          Modify
        </Button>

        <Box
          sx={{
            mt: 2,
            padding: 2,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontSize: '14px',
            background: '#d1d1d1',
            color: 'white',
          }}
        >{`#${row?.ticket} ${row?.type} ${row?.volume} ${row?.symbol} ${row?.price1} at 145.6 with Loss -2.56 `}</Box>
      </DialogContent>
    </Dialog>
  );
}
