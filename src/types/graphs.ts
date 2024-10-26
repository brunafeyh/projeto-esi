export type DishSale = {
    name: string;
    quantity: number;
}

export type SalesPerDish = {
    [key: number]: DishSale;
}