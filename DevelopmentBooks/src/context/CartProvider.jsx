import React, { useReducer } from "react";
import { cartReducerFn } from "./cartReducerFn";
import { cartContext } from "./cartContext";

const initialState = [];

const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducerFn, initialState);

	const addToCart = (bookId, bookTitle, bookPrice) => {
		dispatch({
			type: "ADD_TO_CART",
			payload: { bookId, bookTitle, bookPrice },
		});
	};

	const contextValue = {
		cart: state,
		addToCart,
	};

	return (
		<cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
	);
};

export default CartProvider;
