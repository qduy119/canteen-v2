"use server";

import http from "@/lib/http";
import { bearerTokenHeader } from "./utils";
import Payment from "@/types/payment";

export async function createPayment(paymentPayload: Partial<Payment>) {
    const data = await http.post<any>("/api/payment", paymentPayload, {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}
