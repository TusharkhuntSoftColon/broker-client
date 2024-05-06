import { Box, Typography } from '@mui/material';

interface SymbolPropertiesDetailProps {
  data1: any;
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

const SymbolPropertiesDetailLayout = ({ data1 }: SymbolPropertiesDetailProps) => (
  //   console.log(data1);
  <Box>
    <BasicStyleComponentToDisplayDetail
      label="Currency"
      value={data1?.symbolId?.currency ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail label="Exchange" value={data1?.exchange?.name ?? '--'} />
    <BasicStyleComponentToDisplayDetail
      label="Stop Level"
      value={data1?.symbolId?.stopLevel ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Calculation"
      value={data1?.symbolId?.calculation ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Calculation Value"
      value={data1?.calculationValue ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Tick Size"
      value={data1?.symbolId?.tickSize ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Tick Value"
      value={data1?.symbolId?.tickValue ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Margin Type"
      value={data1?.symbolId?.marginType ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Initial Margin"
      value={data1?.symbolId?.initialMargin ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Min. Quantity Per Lot"
      value={data1?.symbolId?.minQtyPerLot ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Max. Quantity Per Lot"
      value={data1?.symbolId?.maxQtyPerLot ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Max. Position"
      value={data1?.symbolId?.maxPositionQtyPerLot ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Order Types"
      value={
        data1?.orderType.length >= 0 ? data1?.orderType?.map((data: any) => `${data}, `) : '--'
      }
    />
    <BasicStyleComponentToDisplayDetail
      label="Expiration"
      value={data1?.expiryDate?.substring(0, 10) ?? '--'}
    />
    <BasicStyleComponentToDisplayDetail
      label="Status of Script"
      value={data1?.statusOfScript ?? '--'}
    />
    {/* <BasicStyleComponentToDisplayDetail label="Min. Position Holding Time" value="data1" /> */}
    <BasicStyleComponentToDisplayDetail
      label="isActive"
      value={data1?.isActive?.toString() ?? '--'}
    />

    <Box>
      <Typography fontWeight="semibold" fontSize="13px" mt=".7rem">
        TRADES SESSIONS
      </Typography>

      <hr />
      <Box>
        {data1?.exchange?.tradeSessions?.map((day: any) => (
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
