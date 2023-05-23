import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'store/slices/user';

export const store = configureStore({
	reducer: {
		user: userReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
});