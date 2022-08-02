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
    properties: null,
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
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    addProperty: (state, action) => {
      if (state.properties) state.properties = [];
      state.properties.push(action.payload);
    },
  },
});

export const {
  setPlayer,
  addMoney,
  bringSoldiers,
  dropSoldiers,
  removeMoney,
  setProperties,
  addProperty,
} = playerSlice.actions;

export default playerSlice.reducer;
