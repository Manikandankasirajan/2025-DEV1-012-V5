const cartActionHandlers = {
	ADD_TO_CART: (state, action) => {
		if (!state.find((book) => book.bookId === action.payload.bookId)) {
			return [...state, { ...action.payload, quantity: 1 }];
		}
		return state;
	},
};

export function cartReducerFn(state, action) {
	const cartActionHandler = cartActionHandlers[action.type];
	return cartActionHandler ? cartActionHandler(state, action) : state;
}
