import { getItemsInCart } from "@/app/actions/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function Cart() {
    const cart = await getItemsInCart();

    return (
        <Link href="/cart">
            <span className="relative">
                <ShoppingCart className="cursor-pointer" />
                {cart && (
                    <span className="absolute -top-1/2 -right-1/2 text-xs min-w-[20px] min-h-[20px] bg-secondary rounded-full flex items-center justify-center">
                        <p className="text-white dark:text-black font-semibold h-fit w-fit">
                            {cart.length}
                        </p>
                    </span>
                )}
            </span>
        </Link>
    );
}
