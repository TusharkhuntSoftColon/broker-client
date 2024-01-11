/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

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
      const data = action.payload;
      state.symbolList = data;
    },
    updateSymbol: (state, action) => {
      const { id, updatedData } = action.payload;
      const dataIndex = state.symbolList.findIndex((item: any) => item.id === id);

      const data = { ...updatedData, id };

      if (dataIndex !== -1) {
        state.symbolList[dataIndex] = data;
      }
    },
    deleteSymbol: (state, action) => {
      const id = action.payload;
      state.symbolList = state.symbolList.filter((data: any) => data.id !== id);
    },
  },
});

export const { addSymbol, resetState, updateSymbol, deleteSymbol } = symbolSlice.actions;

export default symbolSlice.reducer;
