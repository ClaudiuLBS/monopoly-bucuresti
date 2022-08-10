import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    id: null,
    name: null,
    game_session: null,
    color: null,
    money: null,
    soldiers: null,
    owner: null,
  },
  reducers: {
    setPlayer: (state, action) => {
      if (action.payload) {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.game_session = action.payload.game_session;
        state.color = action.payload.color;
        state.money = action.payload.money;
        state.soldiers = action.payload.soldiers;
        state.owner = action.payload.owner;
      }
    },
    deletePlayer: (state, action) => {
      state.id = null;
      state.name = null;
      state.game_session = null;
      state.color = null;
      state.money = null;
      state.soldiers = null;
      state.owner = null;
    },
    setOwner: (state, action) => {
      state.owner = true;
    },
    addMoney: (state, action) => {
      state.money += action.payload;
    },
    removeMoney: (state, action) => {
      state.money -= action.payload;
    },
    bringSoldiers: (state, action) => {
      state.soldiers += action.payload;
    },
    dropSoldiers: (state, action) => {
      state.soldiers -= action.payload;
    },
  },
});

export const {
  setPlayer,
  deletePlayer,
  addMoney,
  bringSoldiers,
  dropSoldiers,
  removeMoney,
  setOwner,
} = playerSlice.actions;

export default playerSlice.reducer;
