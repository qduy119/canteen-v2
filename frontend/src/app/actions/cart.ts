"use server";

import http from "@/lib/http";
import { bearerTokenHeader, checkIsLoggedIn } from "./utils";
import Cart from "@/types/cart";
import { AddToCartType, ModifyCartItemType } from "@/validations/cart";
import { redirect, RedirectType } from "next/navigation";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getItemsInCart() {
    const isLoggedIn = await checkIsLoggedIn();
    if (!isLoggedIn) return undefined;

    const data = await http.get<Cart[]>("/api/cart-item", {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
        cache: "force-cache",
        next: {
            tags: ["cart"],
        },
    });

    return data.payload;
}

export async function addFoodToCart(payload: AddToCartType) {
    const isLoggedIn = await checkIsLoggedIn();
    if (!isLoggedIn) {
        return redirect(
            `${process.env.NEXT_PUBLIC_CLIENT_URL}/login`,
            RedirectType.replace
        );
    }

    const data = await http.post<any>("/api/cart-item", payload, {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });
    revalidateTag("cart");

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    } else {
        return data.payload;
    }
}

export async function addFoodToCartNow(payload: AddToCartType) {
    const data = await addFoodToCart(payload);
    return data;
}

export async function modifyItemInCart(payload: ModifyCartItemType) {
    const data = await http.put<any>(`/api/cart-item/${payload.id}`, payload, {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });
    revalidateTag("cart");

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}

export async function deleteItemFromCart(id: number) {
    const data = await http.delete<any>(`/api/cart-item/${id}`, {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });
    revalidateTag("cart");

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}

export async function checkout(items: Cart[]) {
    const cookie = cookies();
    cookie.set("checkout", JSON.stringify(items), { httpOnly: true });
    redirect("/checkout");
}
