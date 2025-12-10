import { constants } from "../constants/constants";

const priceFormatter = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	minimumFractionDigits: constants.DECIMAL_POINTS,
	maximumFractionDigits: constants.DECIMAL_POINTS,
});

export default function formatPrice(price) {
	return priceFormatter.format(price);
}
