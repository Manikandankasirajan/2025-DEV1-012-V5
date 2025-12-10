import React from "react";
import { constants } from "../../constants/constants";

const Header = () => {
	return (
		<header className="bg-slate-800">
			<nav className="px-5 py-3 flex justify-between">
				<h1 className="font-bold text-white">{constants.HEADER_TEXT}</h1>
			</nav>
		</header>
	);
};

export default Header;
