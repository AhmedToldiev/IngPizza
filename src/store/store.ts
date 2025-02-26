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
	saveState({ jwt: store.getState().user.jwt }, JWT_PERSISTENT_STATE);
	saveState(store.getState().card, CARD_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
