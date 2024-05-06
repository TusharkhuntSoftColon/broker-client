import { Box, Typography } from '@mui/material';

interface SymbolPropertiesDetailProps {
  data: any;
}

interface BasicStyleComponentToDisplayDetailProps {
  label: string;
  value: any;
}

const BasicStyleComponentToDisplayDetail = ({
  label,
  value,
}: BasicStyleComponentToDisplayDetailProps) => (
  <Box
    sx={{
      borderBottom: '1px solid #d7dee2',
      height: 'fit-content',
      display: 'flex',
      lineHeight: '0px !important',
    }}
  >
    {/* label  */}
    <Box
      sx={{
        flex: 0.7,
        display: 'flex',
        alignItems: 'center',
        padding: '0px 16px',
        bgcolor: '#f9fafa',
      }}
    >
      <Typography sx={{ fontSize: '13px' }}>{label}</Typography>
    </Box>

    {/* value  */}
    <Box
      sx={{
        flex: 1.3,
        display: 'flex',
        alignItems: 'center',
        padding: '0px 16px',
      }}
    >
      <Typography
        fontSize="12px !important"
        style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', fontSize: '13px' }}
        //   key={}
      >
        {value}
      </Typography>
    </Box>
  </Box>
);

const SymbolPropertiesDetailLayout = ({ data }: SymbolPropertiesDetailProps) => (
  //   console.log(data1);
  <Box>
    <BasicStyleComponentToDisplayDetail label="Name" value={data?.name ?? '--'} />
    <BasicStyleComponentToDisplayDetail label="Currency" value={data?.symbolId?.currency ?? '--'} />
    <BasicStyleComponentToDisplayDetail label="Exchange" value={data?.exchange?.name ?? '--'} />
    <BasicStyleComponentToDisplayDetail
      label="Stop Level"
      value={data?.symbolId?.stopLevel ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Calculation"
      value={data?.symbolId?.calculation ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Calculation Value"
      value={data?.calculationValue ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Tick Size"
      value={data?.symbolId?.tickSize ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Tick Value"
      value={data?.symbolId?.tickValue ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Margin Type"
      value={data?.symbolId?.marginType ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Initial Margin"
      value={data?.symbolId?.initialMargin ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Min. Quantity Per Lot"
      value={data?.symbolId?.minQtyPerLot ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Max. Quantity Per Lot"
      value={data?.symbolId?.maxQtyPerLot ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Max. Position"
      value={data?.symbolId?.maxPositionQtyPerLot ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Order Types"
      value={
        data?.orderType.length >= 0 ? data?.orderType?.map((data1: any) => `${data1}, `) : '--'
      }
    />
    <BasicStyleComponentToDisplayDetail
      label="Expiration"
      value={data?.expiryDate?.substring(0, 10) ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Status of Script"
      value={data?.statusOfScript ?? '--'}
    />
    {/* <BasicStyleComponentToDisplayDetail label="Min. Position Holding Time" value="data1" /> */}
    {/* <BasicStyleComponentToDisplayDetail
      label="isActive"
      value={data?.isActive?.toString() ?? '--'}
    /> */}

    <Box>
      <Typography fontWeight="semibold" fontSize="13px" mt=".7rem">
        TRADES SESSIONS
      </Typography>

      <hr />
      <Box>
        {data?.exchange?.tradeSessions?.map((day: any) => (
          <BasicStyleComponentToDisplayDetail
            label={day?.day}
            value={day?.isActive ? `${day?.startTime} : ${day?.endTime}` : '----'}
          />
        ))}
      </Box>
    </Box>
  </Box>
);
export default SymbolPropertiesDetailLayout;
