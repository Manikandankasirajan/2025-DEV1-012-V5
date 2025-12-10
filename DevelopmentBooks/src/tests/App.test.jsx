import { render, screen } from "@testing-library/react";
import App from "../App";
import { beforeEach, expect } from "vitest";
import { testConstants } from "./constants/testConstants";
import userEvent from "@testing-library/user-event";
import useFetchBooks from "../hooks/useFetchBooks";

vi.mock("../hooks/useFetchBooks", () => ({
	default: vi.fn(),
}));

const getShowCartBtn = () => {
	return screen.getByTestId(testConstants.TEST_ID_SHOW_CART_BTN);
};

const getCartOverlay = () => {
	return screen.queryByTestId(testConstants.TEST_ID_CART_OVERLAY);
};

const getCart = () => {
	return screen.queryByTestId(testConstants.TEST_ID_CART);
};

const getCloseCartBtn = () => {
	return screen.queryByTestId(testConstants.TEST_ID_CLOSE_CART_BTN);
};

const findText = (value) => {
	return screen.findByText(value);
};

describe("app component", () => {
	let user;
	beforeEach(() => {
		useFetchBooks.mockReturnValue({
			error: null,
			bookList: testConstants.BOOKS,
		});
		render(<App />);
		user = userEvent.setup();
	});
	it("should render header text", () => {
		const headerText = screen.getByRole("heading", { level: 1 });
		expect(headerText).toHaveTextContent(testConstants.HEADER_TEXT);
	});
	it("should render booklist section heading", () => {
		const bookListheading = screen.getByRole("heading", { level: 2 });
		expect(bookListheading).toHaveTextContent(testConstants.BOOKLIST_HEADING);
	});
	it("should open cart when show cart button is clicked", async () => {
		expect(getShowCartBtn()).toBeInTheDocument();

		const bagIcon = screen.getByTestId(testConstants.TEST_ID_BAG_ICON);
		expect(bagIcon).toBeInTheDocument();

		expect(getCartOverlay()).not.toBeInTheDocument();
		expect(getCart()).not.toBeInTheDocument();

		await user.click(getShowCartBtn());

		expect(getCartOverlay()).toBeInTheDocument();
		expect(getCart()).toBeInTheDocument();
	});
	it("should close cart when close cart button is clicked", async () => {
		await user.click(getShowCartBtn());

		expect(getCart()).toBeInTheDocument();
		expect(getCloseCartBtn()).toBeInTheDocument();
		const xMarkIcon = screen.queryByTestId(testConstants.TEST_ID_XMARK_ICON);
		expect(xMarkIcon).toBeInTheDocument();

		await user.click(getCloseCartBtn());

		expect(getCart()).not.toBeInTheDocument();
	});
	it("should render cart quantity banner in header when books added to cart", async () => {
		const addToCartBtnBook1 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK1
		);
		await user.click(addToCartBtnBook1);
		const cartQtyBanner = screen.queryByTestId(
			testConstants.TEST_ID_CART_QTY_BANNER
		);
		expect(cartQtyBanner).toBeInTheDocument();
		expect(cartQtyBanner.textContent).toEqual(testConstants.ONE);
	});
});

describe("api requests", () => {
	it("should display error message when api request made without url", async () => {
		useFetchBooks.mockReturnValue({ error: testConstants.MISSING_URL_MESSAGE });
		render(<App />);
		expect(
			await findText(testConstants.MISSING_URL_MESSAGE)
		).toBeInTheDocument();
	});
	it("should display error message when api request fails", async () => {
		useFetchBooks.mockReturnValue({ error: testConstants.NETWORK_ERROR });
		render(<App />);
		expect(await findText(testConstants.NETWORK_ERROR)).toBeInTheDocument();
	});
	it("should display no results message when books not found", async () => {
		useFetchBooks.mockReturnValue({
			error: null,
			bookList: testConstants.EMPTY_ARRAY,
		});
		render(<App />);
		expect(
			await findText(testConstants.NO_RESULTS_MESSAGE)
		).toBeInTheDocument();
	});
	it("should render books details when api request is sucessfull", () => {
		useFetchBooks.mockReturnValue({
			error: null,
			bookList: testConstants.BOOKS,
		});
		render(<App />);
		const bookImgs = screen.getAllByTestId(testConstants.TEST_ID_BOOK_IMAGE);
		bookImgs.forEach((bookImg, index) => {
			expect(bookImg).toHaveAttribute("src", testConstants.BOOKS[index].imgSrc);
		});
		const bookTitles = screen.getAllByTestId(testConstants.TEST_ID_BOOK_TITLE);
		bookTitles.forEach((bookTitle, index) => {
			expect(bookTitle).toHaveTextContent(testConstants.BOOKS[index].title);
		});
		const bookPrices = screen.getAllByTestId(testConstants.TEST_ID_BOOK_PRICE);
		bookPrices.forEach((bookPrice, index) => {
			expect(bookPrice).toHaveTextContent(testConstants.BOOKS[index].price);
		});
	});
});
