import { modifyItemInCart } from "@/app/actions/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cart from "@/types/cart";
import { formatPrice, handleError } from "@/lib/utils";
import { modifyCartItemSchema } from "@/validations/cart";
import { MinusCircleIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CartItem({
    item,
    isChecked,
    onSetSelect,
    onDeleteItemInCart,
}: {
    item: Cart;
    isChecked: boolean;
    onSetSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDeleteItemInCart: (id: number) => void;
}) {
    async function handleModify(type = -1) {
        const { item: food, ...cartItem } = item;
        if (type === -1) {
            if (cartItem.quantity > 1) {
                try {
                    const payload = modifyCartItemSchema.parse({
                        id: cartItem.id,
                        quantity: cartItem.quantity - 1,
                    });
                    const data = await modifyItemInCart(payload);

                    if (data?.error) {
                        handleError(data.error);
                    }
                } catch (error) {
                    handleError(error);
                }
            }
        } else {
            if (food.stock >= 1) {
                try {
                    const payload = modifyCartItemSchema.parse({
                        id: cartItem.id,
                        quantity: cartItem.quantity + 1,
                    });
                    const data = await modifyItemInCart(payload);

                    if (data?.error) {
                        handleError(data.error);
                    }
                } catch (error) {
                    handleError(error);
                }
            }
        }
    }

    return (
        <tr className="border-b border-primary-dark">
            <td className="whitespace-nowrap px-6 py-4 font-medium">
                <label htmlFor="check" className="hidden"></label>
                <input
                    type="checkbox"
                    name="check"
                    id="check"
                    checked={isChecked}
                    value={item.id ?? -1}
                    onChange={onSetSelect}
                />
            </td>
            <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center">
                <Link href={`/food/${item.item.id}`}>
                    <div
                        className="w-[50px] h-[50px] bg-center bg-cover rounded-md"
                        style={{
                            backgroundImage: `url(${item.item.thumbnail})`,
                        }}
                    />
                </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-4">{item.item.name}</td>
            <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                    <button onClick={() => handleModify()}>
                        <MinusCircleIcon />
                    </button>
                    <label htmlFor="quantity" className="hidden"></label>
                    <Input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={1}
                        max={item.item.stock}
                        value={item.quantity ?? 0}
                        className="w-[50px]"
                        disabled
                    />
                    <button onClick={() => handleModify(1)}>
                        <PlusCircleIcon />
                    </button>
                </div>
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                {formatPrice({
                    value:
                        item.item.price *
                        (1 - item.item.discount * 0.01) *
                        item.quantity,
                })}
            </td>
            <td className="whitespace-nowrap px-6 py-4">
                <Button onClick={() => onDeleteItemInCart(item.id)}>
                    <Trash2Icon />
                </Button>
            </td>
        </tr>
    );
}
