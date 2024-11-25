"use client";

import React from "react";
import { Eye, ShoppingBag } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { handleError } from "@/lib/utils";
import { addToCartSchema } from "@/validations/cart";
import { addFoodToCartNow, checkout } from "@/app/actions/cart";

export default function FoodItemAction({ id }: { id: number }) {
    async function handleBuyNow() {
        try {
            const payload = addToCartSchema.parse({ quantity: 1, itemId: id });
            const data = await addFoodToCartNow(payload);

            if (data?.error) {
                handleError(data.error);
            } else {
                await checkout([data]);
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline">
                        <Link href={`/food/${id}`}>
                            <Eye className="hover:text-primary transition-all" />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>View Detail</p>
                </TooltipContent>
            </Tooltip>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" onClick={handleBuyNow}>
                        <ShoppingBag className="hover:text-primary transition-all" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Buy Now</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
