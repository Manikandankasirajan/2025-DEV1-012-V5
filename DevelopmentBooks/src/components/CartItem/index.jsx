import PropTypes from "prop-types";
import React from "react";
import { constants } from "../../constants/constants";
import formatPrice from "../../utils/formatPrice";

const CartItem = ({ bookDetails }) => {
	const { bookTitle, bookPrice, quantity } = bookDetails;
	const totalPriceOfBook = bookPrice * quantity;
	return (
		<div className="p-2 grid grid-cols-6 border-b">
			<h3
				className="text-sm col-span-3"
				data-testid={constants.TEST_ID_CART_ITEM_TITLE}>
				{bookTitle}
			</h3>
			<p className="text-sm" data-testid={constants.TEST_ID_CART_ITEM_QTY}>
				{quantity}
			</p>
			<h4 className="text-sm" data-testid={constants.TEST_ID_CART_ITEM_PRICE}>
				{formatPrice(totalPriceOfBook)}
			</h4>
		</div>
	);
};

CartItem.propTypes = {
	bookDetails: PropTypes.shape({
		bookId: PropTypes.string.isRequired,
		bookPrice: PropTypes.number.isRequired,
		bookTitle: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
	}).isRequired,
};

export default CartItem;
