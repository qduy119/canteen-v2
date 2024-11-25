import Coupon from "@/types/coupon";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function CouponItem({
    coupon,
    onSetCoupon,
}: {
    coupon: Coupon;
    onSetCoupon: (coupon: Coupon) => void;
}) {
    const validDateClassName =
        new Date(coupon.expirationDate) > new Date()
            ? ""
            : "text-red-500 font-semibold ";
    const validUsedQuantityClassName =
        coupon.usedQuantity < coupon.usageLimit
            ? ""
            : "text-red-500 font-semibold uppercase";
    const validRadioDisabled =
        coupon.usedQuantity >= coupon.usageLimit ||
        new Date(coupon.expirationDate) <= new Date();

    return (
        <div className="flex mb-4 gap-4 p-4 border-primary border-[1px] rounded-md">
            <div className="flex items-center flex-1">
                <Image src="./tag.png" alt="Tag" width={80} height={80} />
            </div>
            <div>
                <p className="text-2xl">{coupon.title}</p>
                <p className="text-lg text-red-500">
                    {coupon.discountPercentage}% Off
                </p>
                <p className="text-gray-500 text-xs">
                    <span className={validDateClassName}>
                        Valid till: {formatDate(coupon.expirationDate)}
                    </span>
                    <span className={`${validUsedQuantityClassName} ml-5`}>
                        Used{" "}
                        {(
                            100 *
                            (coupon.usedQuantity / coupon.usageLimit)
                        ).toFixed(2)}
                        %{" "}
                    </span>
                </p>
            </div>
            <input
                type="radio"
                name="discount"
                onChange={() => onSetCoupon(coupon)}
                disabled={validRadioDisabled}
            />
        </div>
    );
}
