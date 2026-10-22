import { useState } from 'react'
import { plantList } from '../datas/plantList'
import PlantItem from './ui/PlantItem'
import Categories from './Categories'
import '../styles/ShoppingList.css'
import type {AddToCart, CartItem, Plant} from "../types/plant";

type ShoppingListProps = {
	cart: CartItem[]
	addToCart: AddToCart
}
function ShoppingList({ addToCart }: ShoppingListProps) {
	const [activeCategory, setActiveCategory] = useState<Plant['category'] | ''>('')
	const categories = plantList.reduce<Plant['category'][]>(
		(acc, plant) =>
			acc.includes(plant.category) ? acc : acc.concat(plant.category),
		[]
	)

	return (
		<div className='lmj-shopping-list'>
			<Categories
				categories={categories}
				setActiveCategory={setActiveCategory}
				activeCategory={activeCategory}
			/>

			<ul className='lmj-plant-list'>
				{plantList.map((plant) =>
					!activeCategory || activeCategory === plant.category ? (
						<li key={plant.id}>
							<PlantItem
								id={plant.id}
								cover={plant.cover}
								name={plant.name}
								water={plant.water}
								light={plant.light}
								price={plant.price}
								onAddToCart={() => addToCart(plant)}
							/>
						</li>
					) : null
				)}
			</ul>
		</div>
	)
}

export default ShoppingList
