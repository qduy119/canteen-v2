export default interface Review {
    id: number;
    orderItemId: number;
    userId: string;
    rating: number;
    description: string;
    images: string[];
    createAt: Date;
}
