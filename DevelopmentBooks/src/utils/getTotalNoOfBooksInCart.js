import { constants } from "../constants/constants";

export default function getTotalNoOfBooksInCart(cart) {
	return cart
		? cart
				.map((book) => book.quantity)
				.reduce(
					(totalBooks, quantityOfBook) => (totalBooks += quantityOfBook),
					constants.ZERO
				)
		: null;
}
