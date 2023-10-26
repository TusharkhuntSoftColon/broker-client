/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
interface AuthState {
  symbolList: any;
  refreshToken: null | string;
  role: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  symbolList: [],
  refreshToken: null,
  role: null,
};

const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    resetState: () => initialState,
    addSymbol: (state, action) => {
      // console.log('Action in slice', action.payload);
      const data = action.payload;
      // state.symbolList = state.symbolList.concat({
      //   data,
      //   id: Math.random().toString(36).substr(2, 5),
      // });

      state.symbolList = [
        ...state.symbolList,
        {
          ...data,
          id: Math.random().toString(36).substr(2, 5),
          stAndTp: data?.stAndTp === 'true',
        },
      ];
    },
    updateSymbol: (state, action) => {
      const { id, updatedData } = action.payload;
      const dataIndex = state.symbolList.findIndex((item: any) => item.id === id);

      console.log({ updatedData });
      const data = { ...updatedData, stAndTp: updatedData?.stAndTp === 'true', id: id };

      // console.log({ dataIndex });
      if (dataIndex !== -1) {
        state.symbolList[dataIndex] = data;
      }

      // console.log({ data });
    },
    deleteSymbol: (state, action) => {
      const id = action.payload;
      console.log({ id });
      state.symbolList = state.symbolList.filter((data: any) => data.id !== id);
      // console.log(state.symbolList);
    },
  },
});

export const { addSymbol, resetState, updateSymbol, deleteSymbol } = symbolSlice.actions;

export default symbolSlice.reducer;
