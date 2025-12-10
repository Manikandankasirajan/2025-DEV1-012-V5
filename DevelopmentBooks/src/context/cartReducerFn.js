const cartActionHandlers = {
	ADD_TO_CART: (state, action) => {
		if (!state.find((book) => book.bookId === action.payload.bookId)) {
			return [...state, { ...action.payload, quantity: 1 }];
		}
		return state;
	},
	INCREASE_BOOK_QUANTITY: (state, action) =>
		state.map((item) => {
			if (item.bookId === action.payload)
				return { ...item, quantity: item.quantity + 1 };
			return item;
		}),
	DECREASE_BOOK_QUANTITY: (state, action) =>
		state.map((item) => {
			if (item.bookId === action.payload)
				return { ...item, quantity: item.quantity - 1 };
			return item;
		}),
};

export function cartReducerFn(state, action) {
	const cartActionHandler = cartActionHandlers[action.type];
	return cartActionHandler ? cartActionHandler(state, action) : state;
}
