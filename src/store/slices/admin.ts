/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface AuthState {
  personList: any;
  refreshToken: null | string;
  role: string | null;
  exchangeList: any;
}

// Define the initial state using that type
const initialState: AuthState = {
  personList: [],
  refreshToken: null,
  role: null,
  exchangeList: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetState: () => initialState,
    addPerson: (state, action) => {
      // console.log('Action in slice', action.payload);
      const data = action.payload;
      console.log({ data });
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
      console.log({ updatedData });
      const data = {
        ...updatedData,
        id: id,
        createdAt: new Date().toDateString(),
      };
      const dataIndex = state.personList.findIndex((item: any) => item.id === id);

      console.log({ dataIndex });
      if (dataIndex !== -1) {
        state.personList[dataIndex] = data;
      }

      // console.log({ data });
    },
    deleteAdmin: (state, action) => {
      const id = action.payload;
      console.log({ id });
      state.personList = state.personList.filter((data: any) => data.id !== id);
      // console.log(state.personList);
    },
    addExchanges: (state, action) => {
      state.exchangeList = action.payload;
      // console.log(state.personList);
    },
  },
});

export const { addPerson, resetState, updateAdmin, deleteAdmin, addExchanges } = adminSlice.actions;

export default adminSlice.reducer;
