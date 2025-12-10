import React, { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import { constants } from "../../constants/constants";
import CartItem from "../CartItem";

const CartSummary = () => {
	const { cart } = useContext(cartContext);
	return (
		<div className="p-5">
			<h2 className="pb-3 font-bold border-b-2">
				{constants.CART_SUMMARY_HEADING_TEXT}
			</h2>
			{cart.map((bookDetails) => {
				return <CartItem key={bookDetails.bookId} bookDetails={bookDetails} />;
			})}
		</div>
	);
};

export default CartSummary;
