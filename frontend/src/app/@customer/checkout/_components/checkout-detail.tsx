"use client";

import Cart from "@/types/cart";
import React from "react";
import CheckoutItem from "./checkout-item";
import CheckoutAction from "./checkout-action";

export default function CheckoutDetail({ items }: { items: Cart[] }) {
    return (
        <div className="px-5">
            <p className="font-semibold text-primary text-xl sm:text-2xl text-center px-2">
                Current Cart
            </p>
            <div className="p-5 overflow-x-scroll">
                <table className="min-w-full text-center table-auto bg-white rounded-md">
                    <thead className="font-medium border-b border-primary">
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
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <CheckoutItem
                                key={index}
                                index={index}
                                item={item}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <CheckoutAction items={items} />
        </div>
    );
}
