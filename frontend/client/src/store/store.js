import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import userReducer from 'store/slices/user';
import boardReducer from 'store/slices/board';
import mapReducer from 'store/slices/map';
import toggleReducer from 'store/slices/toggle';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'toggle'],
};

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
  board: boardReducer,
  toggle: toggleReducer,
  // notes: NotesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
