/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface PersonState {
  personData: any;
}

// Define the initial state using that type
const initialState: PersonState = {
  personData: [],
};

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    resetState: () => initialState,
    addUser: (state, action) => {
      const data = action.payload;
      state.personData = data;
    },
  },
});

export const { addUser, resetState } = personSlice.actions;

export default personSlice.reducer;
