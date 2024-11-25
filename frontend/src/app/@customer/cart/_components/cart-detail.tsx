"use client";

import Cart from "@/types/cart";
import React, { useMemo, useState } from "react";
import CartItem from "./cart-item";
import CartAction from "./cart-action";
import { formatPrice, handleError } from "@/lib/utils";
import toast from "react-hot-toast";
import { checkout, deleteItemFromCart } from "@/app/actions/cart";

export default function CartDetail({ cart }: { cart: Cart[] | undefined }) {
    const [select, setSelect] = useState(() => {
        return cart?.reduce((result: { [key: string]: boolean }, item) => {
            result[item.id] = false;
            return result;
        }, {});
    });
    const countItems = useMemo(() => {
        return select
            ? Object.values(select).reduce((count, item) => {
                  if (item) {
                      count++;
                  }
                  return count;
              }, 0)
            : 0;
    }, [select]);
    const totalPrice = useMemo(() => {
        return (
            cart?.reduce((total, item) => {
                if (select?.[item.id]) {
                    total +=
                        item.quantity *
                        item.item.price *
                        (1 - item.item.discount * 0.01);
                }
                return total;
            }, 0) ?? 0
        );
    }, [cart, select]);

    function handleSelect(e: React.ChangeEvent<HTMLInputElement>) {
        setSelect((prev) => {
            const temp = { ...prev };
            temp[e.target.value] = !temp[e.target.value];
            return temp;
        });
    }
    async function handleDeleteItemInCart(id: number) {
        try {
            const data = await deleteItemFromCart(id);

            if (data?.error) {
                handleError(data.error);
            } else {
                toast.success("Delete successfully");
                setSelect((prev) => {
                    const temp = { ...prev };
                    delete temp[id];
                    return temp;
                });
            }
        } catch (error) {
            handleError(error);
        }
    }
    async function handleCheckout() {
        const items = cart?.reduce((result: Cart[], item) => {
            if (select?.[item.id]) {
                result.push(item);
            }
            return result;
        }, []);
        if (items && items.length > 0) {
            try {
                await checkout(items);
            } catch (error) {
                handleError(error);
            }
        }
    }

    return (
        <>
            <div className="p-5 overflow-x-scroll">
                <table className="min-w-full text-center table-auto">
                    <thead className="border-b font-medium dark:border-neutral-500">
                        <tr>
                            <th scope="col" className="px-6 py-4">
                                #
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Thumbnail
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart?.map((item, index) => (
                            <CartItem
                                key={index}
                                item={item}
                                isChecked={select?.[item.id] ?? false}
                                onSetSelect={handleSelect}
                                onDeleteItemInCart={handleDeleteItemInCart}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="my-4">
                <p>
                    Select: <span className="font-semibold">{countItems}</span>
                </p>
                <p>
                    Total:{" "}
                    <span className="font-semibold">
                        {formatPrice({ value: totalPrice })}
                    </span>
                </p>
            </div>
            <CartAction onCheckout={handleCheckout} />
        </>
    );
}
