import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
  name: 'player',
  initialState: {
    id: null,
    code: null,
    start_date: null,
  },
  reducers: {
    setSession: (state, action) => {
      if (action.payload) {
        state.id = action.payload.id;
        state.code = action.payload.code;
        state.start_date = action.payload.start_date;
      }
    },
    setStartDate: (state, action) => {
      state.start_date = action.payload;
    },
  },
});

export const { setSession, setStartDate } = sessionSlice.actions;

export default sessionSlice.reducer;
