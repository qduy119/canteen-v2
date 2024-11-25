import { PaginationResponseType } from "@/types/common";
import Order from "@/types/order";
import queryString from "querystring";

type GetOrdersResponse = PaginationResponseType<Order>;

interface OrdersType {
    page?: number;
    per_page?: number;
}

export const getAllOrders = async ({
    page,
    per_page,
}: OrdersType): Promise<GetOrdersResponse> => {
    const res = await fetch(
        `/api/order?${queryString.stringify({ page, per_page })}`
    );
    if (!res.ok) {
        throw new Error("Error fetching");
    }
    const data = await res.json();

    return data;
};

type CheckRating = {
    isRated: boolean;
};

export const checkRating = async (
    orderItemId: number
): Promise<CheckRating> => {
    const res = await fetch(
        `/api/review/check-rating?orderItemId=${orderItemId}`
    );

    const data = (await res.json()) as CheckRating;
    return data;
};
