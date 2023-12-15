import { useEffect } from 'react';

import Box from '@mui/material/Box';
import { SymbolLiveList } from 'src/sections/symbol-live/view';
import { TradeHistory } from 'src/sections/trade-history/view';

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: Props) => {
  useEffect(() => {
    window.initOnReady();
  }, []);

  return (
    <>
      <Box>
        <Box display="flex">
          <Box sx={{ height: '600px', width: '80%' }}>
            <div id="tv_chart_container" />
          </Box>
          <Box
            sx={{
              width: '20%',

              borderLeft: '4px solid #e0e3eb',
            }}
          >
            <SymbolLiveList />
            {/* <CurrentSymbolTable /> */}
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: 'calc(100% - 600px)' }}>
        <TradeHistory />
      </Box>
    </>
  );
};

export default UserLayout;
