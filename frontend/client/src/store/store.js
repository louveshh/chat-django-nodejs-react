import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from 'store/slices/user/user';
import boardReducer from 'store/slices/board/board'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
	whitelist: ['user', 'board'],
}

const rootReducer = combineReducers({ 
  user: userReducer,
  board: boardReducer,
  // notes: NotesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
});


export const persistor = persistStore(store)