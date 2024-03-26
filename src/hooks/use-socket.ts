/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
/* eslint-disable no-plusplus */
import { io } from 'socket.io-client';

import { SOCKET_URL } from 'src/utils/environments';

import useAuth from './useAuth';

// ----------------------------------------------------------------------

interface ReturnType {
  tableData: any;
  socketConnection: any;
  tableDataUpdated?: any;
}

export function useSocket(defaultValue?: any): ReturnType {
  const [tableData, setTableData] = useState<any>([]);
  const { token } = useAuth();

  // useEffect(() => {
  //   socketConnection(defaultValue);
  // }, [tableData]);

  const socketConnection = async (activeSymbols: any) => {
    try {
      const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        query: {
          transport: 'websocket',
          EIO: '4',
          authorization: token,
        },
        auth: { authorization: token },
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      const Symbols =
        defaultValue === 'client'
          ? activeSymbols.map((symbol: any) => symbol?.scriptName)
          : defaultValue === 'expense' || defaultValue === 'symbol'
            ? activeSymbols.map((symbol: any) => symbol?.socketLiveName)
            : '';
      const parsedSymbols = JSON.stringify(Symbols);

      socket.on('connect', () => {
        console.log('[socket] Connected');
        socket.emit('subscribeToUserServerMarket', parsedSymbols);
      });

      socket.emit('joinUserRoom', parsedSymbols);

      socket.on('disconnect', (reason: any) => {
        console.log('[socket] Disconnected:', reason);
      });
      socket.on('error', (error: any) => {
        console.log('[socket] Error:', error);
      });

      socket.on('marketWatch', (data: any) => {
        setTableData((prev: any) => {
          let index1 = -1;

          for (let index = 0; index < prev.length; index++) {
            const data1 = prev[index];
            if (
              data1?.InstrumentIdentifier &&
              data?.InstrumentIdentifier &&
              data1?.InstrumentIdentifier === data?.InstrumentIdentifier
            ) {
              index1 = index;

              break;
            }
          }

          if (index1 === -1) {
            return [...prev, data];
          }

          const newObj = {
            ...data,
            oldBuyPrice: prev[index1].BuyPrice,
            oldSellPrice: prev[index1].SellPrice,
            oldPercentage: prev[index1].PriceChangePercentage,
          };
          prev[index1] = newObj;
          return [...prev];
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    tableData,
    socketConnection,
  };
}
