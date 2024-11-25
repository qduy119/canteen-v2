import Category from "./category";

export default interface Food {
    id: number;
    categoryId: number;
    thumbnail: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    stock: number;
    images: string[];
    rating: number;
    category?: Category;
}
