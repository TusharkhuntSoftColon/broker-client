/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
interface ExchangeState {
  exchangeList: any;
  refreshToken: null | string;
  role: string | null;
}

// Define the initial state using that type
const initialState: ExchangeState = {
  exchangeList: [],
  refreshToken: null,
  role: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    resetState: () => initialState,
    addExchange: (state, action) => {
      const data = action.payload;
      state.exchangeList = [
        ...state.exchangeList,
        {
          ...data,
          _id: Math.random().toString(36).substr(2, 5),
          status: 'Active',
          stAndTp: data?.stAndTp === 'true',
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString(),
        },
      ];
    },
    updateExchange: (state, action) => {
      const { id, updatedData } = action.payload;
      console.log({ id });
      console.log({ updatedData });
      const data = {
        ...updatedData,
        _id: id,
        status: updatedData?.isActiveExchange === true ? 'Active' : 'In Active',
        stAndTp: updatedData?.stAndTp === 'true',
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
      };
      const dataIndex = state.exchangeList.findIndex((item: any) => item._id === id);
      if (dataIndex !== -1) {
        state.exchangeList[dataIndex] = data;
      }

      // console.log({ data });
    },
    deleteExchange: (state, action) => {
      const id = action.payload;
      console.log({ id });
      state.exchangeList = state.exchangeList.filter((data: any) => data._id !== id);
      // console.log(state.exchangeList);
    },
  },
});

export const { addExchange, resetState, updateExchange, deleteExchange } = exchangeSlice.actions;

export default exchangeSlice.reducer;
