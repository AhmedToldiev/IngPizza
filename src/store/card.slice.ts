import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface CardItem {
	id: number;
	count: number;
}

export interface CardState {
	items: CardItem[];
}

const initialState: CardState = {
	items: [],
};

export const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<number>) => {
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				state.items.push({ id: action.payload, count: 1 });
				return;
			}
			state.items.map(i => {
				if (i.id === action.payload) {
					i.count += 1;
				}
				return i;
			});
		},
	},
});

export const cardReducer = cardSlice.reducer;
export const cardActions = cardSlice.actions;
