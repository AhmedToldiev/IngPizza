import { configureStore } from '@reduxjs/toolkit';
import { JWT_PERSISTENT_STATE, userReducer } from './user.slice';
import { saveState } from './storage';
import { CARD_PERSISTENT_STATE, cardReducer } from './card.slice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		card: cardReducer,
	},
});
store.subscribe(() => {
	const jwt = store.getState().user.jwt || '';
	const card = store.getState().card.items || [];
	saveState(jwt, JWT_PERSISTENT_STATE);
	saveState(JSON.stringify(card), CARD_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
