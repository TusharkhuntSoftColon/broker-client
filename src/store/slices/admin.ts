/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthState {
  personList: any;
  refreshToken: null | string;
  role: string | null;
  exchangeList: any;
  brokerageList: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  personList: [],
  refreshToken: null,
  role: null,
  exchangeList: [],
  brokerageList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetState: () => initialState,
    addPerson: (state, action) => {
      const data = action.payload;
      // state.personList = state.personList.concat({
      //   data,
      //   id: Math.random().toString(36).substr(2, 5),
      // });

      state.personList = data;
      // state.personList = [
      //   ...state.personList,
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
      const data = {
        ...updatedData,
        id,
        createdAt: new Date().toDateString(),
      };
      const dataIndex = state.personList.findIndex((item: any) => item.id === id);

      if (dataIndex !== -1) {
        state.personList[dataIndex] = data;
      }
    },
    deleteAdmin: (state, action) => {
      const id = action.payload;
      state.personList = state.personList.filter((data: any) => data.id !== id);
    },
    addExchanges: (state, action) => {
      state.exchangeList = action.payload;
    },
    addBrokerage: (state, action) => {
      state.brokerageList = action.payload;
    },
  },
});

export const { addPerson, resetState, updateAdmin, deleteAdmin, addExchanges, addBrokerage } =
  adminSlice.actions;

export default adminSlice.reducer;
