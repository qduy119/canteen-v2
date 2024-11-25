import { getItemsInCart } from "@/app/actions/cart";
import { ChevronLeft, User2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";
import CartDetail from "./_components/cart-detail";
import { Separator } from "@/components/ui/separator";

export default async function CartPage() {
    const cart = await getItemsInCart();

    return (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <div className="rounded-lg mt-4">
                <div className="flex items-center px-3 py-2 gap-1">
                    <User2Icon />
                    USERS MEAL
                </div>
                <Separator />
                <CartDetail cart={cart} />
            </div>
        </div>
    );
}
