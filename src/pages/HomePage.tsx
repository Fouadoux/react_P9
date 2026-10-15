import Footer from '../components/layout/Footer'
import ShoppingList from '../components/ShoppingList'
import '../styles/Layout.css'
import * as React from "react";

function HomePage({ cart, addToCart }:React.ComponentProps<typeof ShoppingList>) {
	return (
		<div>
			<div className='lmj-layout-inner'>
				<ShoppingList cart={cart} addToCart={addToCart} />
			</div>
			<Footer />
		</div>
	)
}

export default HomePage 
