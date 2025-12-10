import React from "react";
import { constants } from "../../constants/constants";
import useFetchBooks from "../../hooks/useFetchBooks";
import Book from "../Book";

const BookListView = () => {
	const { error, bookList } = useFetchBooks(constants.API_URL);
	const isBookListEmpty = () => !bookList || bookList.length === constants.ZERO;
	return (
		<main>
			<h2 className="py-5 font-bold text-center">
				{constants.BOOKLIST_HEADING}
			</h2>
			{error && <p className="mt-48 text-center">{error}</p>}
			{isBookListEmpty() ? (
				<p className="mt-48 text-center">{constants.NO_RESULTS_MESSAGE}</p>
			) : (
				<div className="px-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
					{bookList.map((bookDetails) => {
						return <Book key={bookDetails.id} bookDetails={bookDetails} />;
					})}
				</div>
			)}
		</main>
	);
};

export default BookListView;
