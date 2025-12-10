import { constants } from "../constants/constants";
import createOptimizedBookSets from "./createOptimizedBookSets";

export default function createSetOfUniqueBooks(books) {
	const booksCopy = JSON.parse(JSON.stringify(books));
	const bookSetsPossible = Math.max(...booksCopy.map((book) => book.quantity));

	let bookSets = [];
	for (let i = constants.ZERO; i < bookSetsPossible; i++) {
		const currentSet = [];
		booksCopy.forEach((book) => {
			if (book.quantity > 0) {
				currentSet.push({ bookId: book.bookId, bookPrice: book.bookPrice });
				book.quantity--;
			}
		});
		bookSets.push(currentSet);
	}

	bookSets = createOptimizedBookSets(bookSets);

	return bookSets;
}
