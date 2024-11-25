import Category from "@/types/category";
import Food from "@/types/food";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = ({
    value,
    locale = "en-US",
    currency = "USD",
}: {
    value: number;
    locale?: string;
    currency?: string;
}): string => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(value);
};

export const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
};

export const wait = (ms: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

export type CustomErrorType = { statusCode: number; message: string };

export const handleError = (err: any) => {
    toast.error(
        err
            ? `Error ${err.statusCode}: ${err.message}`
            : "500: Something went wrong"
        , {
            className: "error",
        }
    );
};

export const getProductByPagination = (
    foods: Food[],
    page: number,
    per_page: number
) => {
    const offset = per_page * (page - 1);
    const total_pages = Math.ceil(foods.length / per_page);
    const rows = foods.slice(offset, per_page + offset);
    return { rows, total_pages };
};

export const getCategoryFromProducts = (foods: Food[]) => {
    return foods.reduce((result: Category[], product) => {
        const category = product.category;
        if (
            !result.filter((item) => item.id === category?.id).length &&
            category
        ) {
            result.push(category);
        }
        return result;
    }, []);
};

export const getProductByCondition = (products: Food[], condition: any) => {
    const { categoryToFilter, priceRange, rating } = condition;
    let finalResult = products;
    if (categoryToFilter) {
        finalResult = finalResult.reduce((result: Food[], product) => {
            const categoryId = product.category?.id;
            if (categoryToFilter.includes(categoryId)) {
                result.push(product);
            }
            return result;
        }, []);
    }
    if (priceRange) {
        finalResult = finalResult.filter(
            (item) =>
                priceRange.min <= item.price && item.price <= priceRange.max
        );
    }
    if (rating) {
        finalResult = finalResult.filter((item) => {
            if (rating >= 5) {
                return item.rating === 5;
            } else {
                return item.rating >= rating;
            }
        });
    }
    return finalResult;
};
