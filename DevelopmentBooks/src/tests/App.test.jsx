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
	it("should disable add to cart button for books added to cart", async () => {
		const addToCartBtnBook1 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK1
		);
		await user.click(addToCartBtnBook1);
		expect(addToCartBtnBook1).toBeDisabled();
		expect(addToCartBtnBook1).toHaveTextContent(testConstants.CHECK_MARK);
	});
	it("should render empty cart with image and message when cart is empty", async () => {
		const cartQtyBanner = screen.queryByTestId(
			testConstants.TEST_ID_CART_QTY_BANNER
		);
		expect(cartQtyBanner).not.toBeInTheDocument();
		await user.click(getShowCartBtn());

		const emptyCart = screen.getByTestId(testConstants.TEST_ID_EMPTY_CART);
		const emptyCartImage = screen.getByTestId(
			testConstants.TEST_ID_EMPTY_CART_IMAGE
		);
		const emptyCartMessage = await screen.findByText(
			testConstants.EMPTY_CART_MESSAGE
		);

		expect(emptyCart).toBeInTheDocument();
		expect(emptyCartImage).toHaveAttribute(
			"src",
			testConstants.EMPTY_CART_IMAGE
		);
		expect(emptyCartMessage).toBeInTheDocument();
	});
	it("should render cart summary with book details when books added to cart", async () => {
		const addToCartBtnBook1 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK1
		);
		await user.click(addToCartBtnBook1);
		await user.click(getShowCartBtn());

		const cartItemTitle = screen.getByTestId(
			testConstants.TEST_ID_CART_ITEM_TITLE
		);
		const cartItemQty = screen.getByTestId(testConstants.TEST_ID_CART_ITEM_QTY);
		const cartItemPrice = screen.getByTestId(
			testConstants.TEST_ID_CART_ITEM_PRICE
		);

		expect(cartItemTitle).toHaveTextContent(testConstants.BOOK_ONE_TITLE);
		expect(cartItemQty).toHaveTextContent(testConstants.BOOK_ONE_QTY);
		expect(cartItemPrice).toHaveTextContent(testConstants.BOOK_ONE_PRICE);
	});
	it("should return totalprice-50,discountprice-0,finalprice-50 for one book purchase", async () => {
		const addToCartBtnBook1 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK1
		);
		await user.click(addToCartBtnBook1);
		await user.click(getShowCartBtn());

		const totalPriceLabel = screen.getByTestId(
			testConstants.TEST_ID_TOTAL_PRICE_LABEL
		);
		const discountPriceLabel = screen.getByTestId(
			testConstants.TEST_ID_DISCOUNT_PRICE_LABEL
		);
		const finalPriceLabel = screen.getByTestId(
			testConstants.TEST_ID_FINAL_PRICE_LABEL
		);

		const totalPriceValue = screen.getByTestId(
			testConstants.TEST_ID_TOTAL_PRICE_VALUE
		);
		const discountPriceValue = screen.getByTestId(
			testConstants.TEST_ID_DISCOUNT_PRICE_VALUE
		);
		const finalPriceValue = screen.getByTestId(
			testConstants.TEST_ID_FINAL_PRICE_VALUE
		);

		expect(totalPriceValue).toHaveTextContent(
			testConstants.TOTAL_PRICE_FOR_ONE_BOOK
		);
		expect(discountPriceValue).toBeInTheDocument(
			testConstants.DISCOUNT_PRICE_FOR_ONE_BOOK
		);
		expect(finalPriceValue).toBeInTheDocument(
			testConstants.DISCOUNT_PRICE_FOR_ONE_BOOK
		);
	});
	it("should return totalprice-100,discountprice-5,finalprice-95 for two book purchase", async () => {
		const addToCartBtnBook1 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK1
		);
		const addToCartBtnBook2 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK2
		);
		await user.click(addToCartBtnBook1);
		await user.click(addToCartBtnBook2);
		await user.click(getShowCartBtn());

		screen.debug();

		const totalPriceValue = screen.getByTestId(
			testConstants.TEST_ID_TOTAL_PRICE_VALUE
		);
		const discountPriceValue = screen.getByTestId(
			testConstants.TEST_ID_DISCOUNT_PRICE_VALUE
		);
		const finalPriceValue = screen.getByTestId(
			testConstants.TEST_ID_FINAL_PRICE_VALUE
		);

		expect(totalPriceValue).toHaveTextContent(
			testConstants.TOTAL_PRICE_FOR_TWO_BOOK
		);
		expect(discountPriceValue).toHaveTextContent(
			testConstants.DISCOUNT_PRICE_FOR_TWO_BOOK
		);
		expect(finalPriceValue).toHaveTextContent(
			testConstants.FINAL_PRICE_FOR_TWO_BOOK
		);
	});
	it("should return totalprice-150,discountprice-15,finalprice-135 for three book purchase", async () => {
		const addToCartBtnBook1 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK1
		);
		const addToCartBtnBook2 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK2
		);
		const addToCartBtnBook3 = screen.getByTestId(
			testConstants.TEST_ID_ADD_TO_CART_BTN_BOOK3
		);
		await user.click(addToCartBtnBook1);
		await user.click(addToCartBtnBook2);
		await user.click(addToCartBtnBook3);
		await user.click(getShowCartBtn());

		const totalPriceValue = screen.getByTestId(
			testConstants.TEST_ID_TOTAL_PRICE_VALUE
		);
		const discountPriceValue = screen.getByTestId(
			testConstants.TEST_ID_DISCOUNT_PRICE_VALUE
		);
		const finalPriceValue = screen.getByTestId(
			testConstants.TEST_ID_FINAL_PRICE_VALUE
		);

		expect(totalPriceValue).toHaveTextContent(
			testConstants.TOTAL_PRICE_FOR_THREE_BOOK
		);
		expect(discountPriceValue).toHaveTextContent(
			testConstants.DISCOUNT_PRICE_FOR_THREE_BOOK
		);
		expect(finalPriceValue).toHaveTextContent(
			testConstants.FINAL_PRICE_FOR_THREE_BOOK
		);
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
