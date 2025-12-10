import React, { useState } from "react";
import Header from "./components/Header";
import BookListView from "./components/BookListView";
import Cart from "./components/Cart";
import CartProvider from "./context/CartProvider";

const App = () => {
	const [showCart, setShowCart] = useState(false);
	return (
		<>
			<CartProvider>
				<Header setShowCart={setShowCart} />
				<BookListView />
				{showCart && <Cart setShowCart={setShowCart} />}
			</CartProvider>
		</>
	);
};

export default App;
