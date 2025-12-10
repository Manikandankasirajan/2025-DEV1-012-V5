import React, { useContext } from "react";
import { constants } from "../../constants/constants";
import PropTypes from "prop-types";
import { FaXmark } from "react-icons/fa6";
import { cartContext } from "../../context/cartContext";
import EmptyCart from "../EmptyCart";

const Cart = ({ setShowCart }) => {
	const { cart } = useContext(cartContext);
	const isCartEmpty = () => cart.length === constants.ZERO;
	return (
		<div
			className="w-screen h-screen fixed top-0 left-0 z-40 bg-slate-400/50 flex justify-end"
			data-testid={constants.TEST_ID_CART_OVERLAY}>
			<section
				className="relative w-10/12 bg-gray-50 shadow-2xl z-50 md:w-1/2 lg:w-1/3"
				data-testid={constants.TEST_ID_CART}>
				<button
					aria-label={constants.CLOSE_CART_BTN_LABEL}
					className="absolute top-5 right-5 text-xl cursor-pointer"
					onClick={() => setShowCart(false)}
					data-testid={constants.TEST_ID_CLOSE_CART_BTN}>
					<FaXmark data-testid={constants.TEST_ID_XMARK_ICON} />
				</button>
				{isCartEmpty() && <EmptyCart />}
			</section>
		</div>
	);
};

Cart.propTypes = {
	setShowCart: PropTypes.func.isRequired,
};

export default Cart;
