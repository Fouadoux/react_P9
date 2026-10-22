
export type Plant = {
    name: string,
    category: "classique" | "extérieur" | "plante grasse",
    id: string,
    light:
        1 | 2 | 3,
    water: 1 | 2 | 3,
    cover: string,
    price: number,
    description:string,
}

export type CartItem = Plant & {
    amount: number,
}


export type AddToCart = (plant: Plant) => void
