export type PaymentStatus = "Pending" | "Success" | "Cancel" | "Error";

export default interface Payment {
    id: number;
    userId: string;
    orderId: number;
    payDate: Date;
    bankCode: string;
    cardType: string;
    amount: number;
    status: PaymentStatus;
}
