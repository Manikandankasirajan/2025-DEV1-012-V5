import PropTypes from "prop-types";
import React, { useContext } from "react";
import { constants } from "../../constants/constants";
import formatPrice from "../../utils/formatPrice";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { cartContext } from "../../context/cartContext";

const CartItem = ({ bookDetails }) => {
	const { bookId, bookTitle, bookPrice, quantity } = bookDetails;
	const totalPriceOfBook = bookPrice * quantity;
	const { increaseBookQuantity, decreaseBookQuantity } =
		useContext(cartContext);
	return (
		<div className="p-2 grid grid-cols-6 border-b">
			<h3
				className="text-sm col-span-3"
				data-testid={constants.TEST_ID_CART_ITEM_TITLE}>
				{bookTitle}
			</h3>
			<div className="flex justify-evenly items-center">
				<button
					aria-label={constants.DECREASE_BOOK_QTY_LABEL}
					className="text-xs cursor-pointer disabled:cursor-default"
					data-testid={constants.TEST_ID_DECREASE_BOOK_QTY_BTN}
					onClick={() => decreaseBookQuantity(bookId)}
					disabled={quantity <= constants.ONE}>
					<FaMinus data-testid={constants.TEST_ID_MINUS_ICON} />
				</button>
				<p className="text-sm" data-testid={constants.TEST_ID_CART_ITEM_QTY}>
					{quantity}
				</p>
				<button
					aria-label={constants.INCREASE_BOOK_QTY_LABEL}
					className="text-xs cursor-pointer"
					data-testid={constants.TEST_ID_INCREASE_BOOK_QTY_BTN}
					onClick={() => increaseBookQuantity(bookId)}>
					<FaPlus data-testid={constants.TEST_ID_PLUS_ICON} />
				</button>
			</div>
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
