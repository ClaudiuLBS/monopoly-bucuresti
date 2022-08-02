import { configureStore } from '@reduxjs/toolkit';
import playerSlice from './playerSlice';
import sessionSlice from './sessionSlice';

export const store = configureStore({
  reducer: {
    player: playerSlice,
    session: sessionSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        ignoredPaths: ['player', 'session'],
      },
      serializableCheck: { ignoredPaths: ['player', 'session'] },
    }),
});
