/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect } from 'react';
import { Resizable } from 're-resizable';

import Box from '@mui/material/Box';

import { TradeHistory } from 'src/sections/trade-history/view';
import { SymbolLiveList } from 'src/sections/symbol-live/view';

type Props = {
  children: React.ReactNode;
};

const UserLayout = ({ children }: Props) => {
  useEffect(() => {
    console.log(typeof window.initOnReady);
    typeof window.initOnReady === 'function'
      ? window.initOnReady()
      : console.error('Error in getting chart');
  }, []);

  const enable = {
    left: true,
  };

  return (
    <>
      <Box>
        <Box display="flex">
          <Box sx={{ width: '80%', height: '600px' }}>
            <div id="tv_chart_container" />
          </Box>
          <Resizable enable={enable}>
            <Box
              sx={{
                minWidth: '400px',
                height: '600px',
                borderLeft: '2px solid #e0e3eb',
              }}
            >
              <SymbolLiveList />
            </Box>
          </Resizable>
        </Box>
      </Box>
      <Box sx={{ height: 'calc(100% - 600px)' }}>
        <TradeHistory />
      </Box>
    </>
  );
};

export default UserLayout;
