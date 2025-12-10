import React from "react";
import { constants } from "../../constants/constants";

const EmptyCart = () => {
	return (
		<div
			className="absolute top-1/3 left-1/3  opacity-65"
			data-testid={constants.TEST_ID_EMPTY_CART}>
			<img
				src={constants.EMPTY_CART_IMAGE}
				alt={constants.EMPTY_CART_IMAGE_ALT_TEXT}
				className="w-32"
				data-testid={constants.TEST_ID_EMPTY_CART_IMAGE}
			/>
			<h3 className="font-bold mt-3">{constants.EMPTY_CART_MESSAGE}</h3>
		</div>
	);
};

export default EmptyCart;
