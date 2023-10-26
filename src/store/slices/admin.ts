/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../index';

// Define a type for the slice state
interface AuthState {
  adminList: any;
  refreshToken: null | string;
  role: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  adminList: [],
  refreshToken: null,
  role: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetState: () => initialState,
    addAdmin: (state, action) => {
      // console.log('Action in slice', action.payload);
      const data = action.payload;
      // state.adminList = state.adminList.concat({
      //   data,
      //   id: Math.random().toString(36).substr(2, 5),
      // });

      state.adminList = [
        ...state.adminList,
        { ...data, id: Math.random().toString(36).substr(2, 5) },
      ];
      // state.adminList = [
      //   ...state.adminList,
      //   {
      //     ...data,
      //     _id: Math.random().toString(36).substr(2, 5),
      //     status: 'Active',
      //     createdAt: new Date().toDateString(),
      //     updatedAt: new Date().toDateString(),
      //   },
      // ];
    },
    updateAdmin: (state, action) => {
      const { id, updatedData } = action.payload;
      const data = { ...updatedData, id: id };
      const dataIndex = state.adminList.findIndex((item: any) => item.id === id);

      console.log({ dataIndex });
      if (dataIndex !== -1) {
        state.adminList[dataIndex] = data;
      }

      // console.log({ data });
    },
    deleteAdmin: (state, action) => {
      const id = action.payload;
      console.log({ id });
      state.adminList = state.adminList.filter((data: any) => data.id !== id);
      // console.log(state.adminList);
    },
  },
});

export const { addAdmin, resetState, updateAdmin, deleteAdmin } = adminSlice.actions;

export default adminSlice.reducer;
