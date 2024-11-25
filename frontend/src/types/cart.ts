import Food from "./food";

export default interface Cart {
    id: number;
    userId: string;
    itemId: number;
    quantity: number;
    item: Food;
}
