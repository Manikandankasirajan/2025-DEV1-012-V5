import { constants } from "../constants/constants";

export default function createOptimizedBookSets(bookSets) {
	let optimizedBookSets = bookSets;
	while (isOptimizationPosible(optimizedBookSets)) {
		const setOf5 = optimizedBookSets.find(
			(bookSet) => bookSet.length === constants.FIVE
		);
		const setOf3 = optimizedBookSets.find(
			(bookSet) => bookSet.length === constants.THREE
		);
		setOf3.push(setOf5.pop());
	}
	return optimizedBookSets;
}

function isOptimizationPosible(bookSets) {
	return (
		bookSets.filter((bookSet) => bookSet.length === constants.THREE).length >
			constants.ZERO &&
		bookSets.filter((bookSet) => bookSet.length === constants.FIVE).length >
			constants.ZERO
	);
}
