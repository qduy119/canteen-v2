import OrderItem from "./order-item";
import Payment from "./payment";

export type OrderStatus = "Pending" | "Success" | "Cancel" | "Error";

export default interface Order {
    id: number;
    userId: string;
    orderDate: Date;
    couponCode: string;
    couponTitle: string;
    discountPercentage: number;
    total: number;
    seatNumber: number;
    status: OrderStatus;
    orderItems?: OrderItem[];
    payment?: Payment;
}
