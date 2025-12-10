import React from "react";
import { constants } from "../../constants/constants";
import PropTypes from "prop-types";

const CartQuantityBanner = ({ value }) => {
	return (
		<>
			<small
				className="min-w-4 h-4 absolute top-1 right-3 text-center text-white text-xs bg-red-600 rounded-full"
				data-testid={constants.TEST_ID_CART_QTY_BANNER}>
				{value}
			</small>
		</>
	);
};

CartQuantityBanner.propTypes = {
	value: PropTypes.number.isRequired,
};
export default CartQuantityBanner;
