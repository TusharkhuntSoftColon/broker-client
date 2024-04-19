/* eslint-disable no-plusplus */
/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-no-constructed-context-values */
// SocketContext.ts

import io from 'socket.io-client';
import React, { useState, useEffect, ReactNode, useContext, createContext } from 'react';

import useAuth from 'src/hooks/useAuth';

import { SOCKET_URL } from 'src/utils/environments';

interface SocketContextType {
  socket: any | null;
  connect: () => void;
  disconnect: () => void;
  subscribeToMarket: (reason: string, activeSymbols: any) => void;
  joinUserRoom: any;
  marketWatch: any;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  connect: () => {},
  disconnect: () => {},
  subscribeToMarket: () => {},
  joinUserRoom: () => {},
  marketWatch: () => {},
});

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<any | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
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

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const connect = () => {
    if (socket) {
      // You may emit events or perform other operations on connection
    }
  };

  const disconnect = () => {
    if (socket) {
      // console.log('[socket] Disconnected');
      // You may perform cleanup or other operations on disconnection
    }
  };

  const subscribeToMarket = (reason: string, activeSymbols: any) => {
    const Symbols =
      reason === 'client' || reason === 'personDetails'
        ? activeSymbols?.map((symbol: any) => symbol?.scriptName)
        : reason === 'expense' || reason === 'symbol'
          ? activeSymbols?.map((symbol: any) => symbol?.socketLiveName)
          : '';

    const parsedSymbols = JSON.stringify(Symbols);
    if (socket) {
      socket.emit('subscribeToUserServerMarket', parsedSymbols);
    }
  };

  const joinUserRoom = (reason: string, activeSymbols: any) => {
    const Symbols =
      reason === 'client' || reason === 'personDetails'
        ? activeSymbols?.map((symbol: any) => symbol?.scriptName)
        : reason === 'expense' || reason === 'symbol'
          ? activeSymbols?.map((symbol: any) => symbol?.socketLiveName)
          : '';
    const parsedSymbols = JSON.stringify(Symbols);
    if (socket) {
      socket.emit('joinUserRoom', parsedSymbols);
    }
  };
  const marketWatch = (setSocketData: any) => {
    if (socket) {
      socket.on('marketWatch', async (data: any) => {
        await setSocketData((prev: any) => {
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
    }
  };

  return (
    <SocketContext.Provider
      value={{ socket, connect, disconnect, subscribeToMarket, joinUserRoom, marketWatch }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextType => {
  return useContext(SocketContext);
};
