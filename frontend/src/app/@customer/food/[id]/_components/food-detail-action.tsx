"use client";

import { addFoodToCart, addFoodToCartNow } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleError } from "@/lib/utils";
import { addToCartSchema } from "@/validations/cart";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function FoodDetailAction({
    stock,
    itemId,
}: {
    stock: number;
    itemId: number;
}) {
    const [quantity, setQuantity] = useState(1);

    function handleChangeQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        let quantity = +e.target.value;
        if (quantity < 0) {
            quantity = 1;
        } else if (quantity > stock) {
            quantity = stock;
        }
        setQuantity(quantity);
    }
    function handleModify(type = -1) {
        if (type === -1) {
            if (quantity > 1) {
                setQuantity((prev) => prev - 1);
            }
        } else {
            if (quantity < stock) {
                setQuantity((prev) => prev + 1);
            }
        }
    }
    async function handleAddToCart() {
        if (quantity > 0 && quantity <= stock) {
            try {
                const payload = addToCartSchema.parse({ quantity, itemId });
                const data = await addFoodToCart(payload);

                if(data?.error) {
                    handleError(data.error);
                } else {
                    toast.success("Add item successfully");
                }
            } catch (error) {
                handleError(error);
            }
        }
    }
    async function handleBuyNow() {
        if (quantity > 0 && quantity <= stock) {
            try {
                const payload = addToCartSchema.parse({ quantity, itemId });
                const data = await addFoodToCartNow(payload);

                if(data?.error) {
                    handleError(data.error);
                }
            } catch (error) {
                handleError(error);
            }
        }
    }

    return (
        <div>
            <div className="flex items-center gap-x-4 mt-4">
                <Button onClick={() => handleModify()}>
                    <Minus />
                </Button>
                <label htmlFor="quantity" className="hidden"></label>
                <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min={1}
                    max={stock}
                    value={quantity}
                    onChange={handleChangeQuantity}
                    className="w-fit"
                />
                <Button onClick={() => handleModify(1)}>
                    <Plus />
                </Button>
            </div>
            <div className="mt-4 flex gap-x-5">
                <Button
                    type="button"
                    onClick={handleBuyNow}
                    className="text-sm sm:text-lg w-1/2"
                >
                    BUY NOW
                </Button>
                <Button
                    type="button"
                    onClick={handleAddToCart}
                    className="text-sm sm:text-lg w-1/2"
                >
                    ADD TO CART
                </Button>
            </div>
        </div>
    );
}
