"use server";

import http from "@/lib/http";
import { bearerTokenHeader } from "./utils";

export async function updateOrderStatus({
    orderId,
    status,
}: {
    orderId: number;
    status: string;
}) {
    const data = await http.put<any>(
        `/api/order/${orderId}`,
        { status },
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}

export async function payOrder(payload: any) {
    const data = await http.post<any>(
        "/api/payment/create-payment-url",
        payload,
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    } else {
        return data.payload;
    }
}

export async function cancelOrder(orderId: number) {
    const data = await http.put<any>(
        `/api/order/cancel/${orderId}`,
        {},
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}
