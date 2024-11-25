import { PaginationResponseType } from "@/types/common";
import Food from "@/types/food";
import Review from "@/types/review";
import User from "@/types/user";
import queryString from "querystring";

type GetFoodsResponse = PaginationResponseType<Food>;

interface FoodsType {
    page?: number;
    per_page?: number;
    keyword?: string;
    categoryId?: number | string;
}

export const getAllFoods = async ({
    page,
    per_page,
    keyword,
    categoryId,
}: FoodsType): Promise<GetFoodsResponse> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/item?${queryString.stringify(
            { page, per_page, keyword, categoryId }
        )}`
    );
    if (!res.ok) {
        throw new Error("Error fetching");
    }
    const data = await res.json();

    return data;
};

export const getAllTopSellingFoods = async (): Promise<Food[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/top-5`,
        {
            cache: "no-cache",
        }
    );
    if (!res.ok) {
        throw new Error("Error fetching");
    }
    const data = await res.json();

    return data;
};

export type FoodReview = Review & { user: User };

interface FoodDetailResponse {
    data: Food;
    reviews: FoodReview[];
}

export const getFoodById = async ({
    id,
}: {
    id: string;
}): Promise<FoodDetailResponse> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/item/${id}`,
        {
            cache: "no-cache",
        }
    );
    if (!res.ok) {
        throw new Error("Error fetching");
    }
    const data = await res.json();

    return data;
};
