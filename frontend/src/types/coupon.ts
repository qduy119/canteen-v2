export default interface Coupon {
    id: number;
    code: string;
    title: string;
    discountPercentage: number;
    expirationDate: Date;
    usedQuantity: number;
    usageLimit: number;
}
