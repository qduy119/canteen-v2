import Food from "./food";

export default interface OrderItem {
    id: number;
    itemId: number;
    orderId: number;
    quantity: number;
    price: number;
    item: Food;
}
