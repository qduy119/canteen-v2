"use server";

import http from "@/lib/http";
import Cart from "@/types/cart";
import { cookies } from "next/headers";
import { bearerTokenHeader } from "./utils";
import { revalidateTag } from "next/cache";
import { ProceedOrderType } from "@/validations/checkout";

export async function getCheckoutCartItems(): Promise<Cart[]> {
    const items = cookies().get("checkout")?.value || "[]";
    return JSON.parse(items);
}

export async function proceedCheckoutOrder(payload: ProceedOrderType) {
    const data = await http.post<any>("/api/order", payload, {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });

    if (data.status === 200) {
        revalidateTag("cart");
        cookies().delete("checkout");
    } else {
        return {
            error: data.payload,
        };
    }
}
