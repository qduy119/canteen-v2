import Coupon from "@/types/coupon";
import React, { useMemo, useState } from "react";
import SeatDialog from "./seat-dialog";
import CouponDialog from "./coupon-dialog";
import { BadgePercentIcon } from "lucide-react";
import Cart from "@/types/cart";
import { formatPrice, handleError, wait } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { proceedOrderSchema, ProceedOrderType } from "@/validations/checkout";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { proceedCheckoutOrder } from "@/app/actions/checkout";
import Spinner from "@/components/spinner";

export default function CheckoutAction({ items }: { items: Cart[] }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const queryClient = useQueryClient();

    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const [seatNumber, setSeatNumber] = useState<number | null>(null);

    const itemsPrice = useMemo(() => {
        return items.reduce((total, item) => {
            total += Number(
                item.quantity *
                    item.item.price *
                    (1 - item.item.discount * 0.01)
            );
            return total;
        }, 0);
    }, [items]);
    const itemsDiscountPrice = useMemo(() => {
        return coupon ? 0.01 * coupon.discountPercentage * itemsPrice : 0;
    }, [coupon, itemsPrice]);

    const getTotalPrice = () => itemsPrice - itemsDiscountPrice;

    function handleSeatNumber(seatNumber: number) {
        setSeatNumber(seatNumber);
    }
    function handleCoupon(code: Coupon) {
        setCoupon(code);
    }
    async function handleCheckout() {
        const payload: ProceedOrderType = {
            orderDate: new Date(),
            total: getTotalPrice(),
            checkoutItems: items,
        };
        if (seatNumber) {
            payload.seatNumber = seatNumber;
        }
        if (coupon) {
            payload.couponCode = coupon.code;
            payload.couponTitle = coupon.title;
            payload.discountPercentage = coupon.discountPercentage;
        }

        setIsPending(true);
        try {
            const parsedPayload = proceedOrderSchema.parse(payload);

            const data = await proceedCheckoutOrder(parsedPayload);

            if (data?.error) {
                handleError(data.error);
            } else {
                setIsPending(false);
                toast.success("Place order successfully");
                queryClient.invalidateQueries({ queryKey: ["orders", 1] });
                await wait(1500);
                router.push("/order");
            }
        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className="py-5">
            <div className="flex flex-row-reverse justify-between">
                <table className="border-spacing-2 border-separate">
                    <tbody className="text-lg">
                        <tr>
                            <td>
                                <p className="font-medium text-primary-light">
                                    PRICE
                                </p>
                            </td>
                            <td>
                                <span className="font-bold text-primary">
                                    {formatPrice({ value: itemsPrice })}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="font-medium text-primary-light">
                                    DISCOUNT
                                </p>
                            </td>
                            <td>
                                <span className="font-bold text-primary">
                                    {formatPrice({
                                        value: itemsDiscountPrice,
                                    })}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="font-medium text-primary-light">
                                    TOTAL
                                </p>
                            </td>
                            <td>
                                <span className="font-bold text-primary">
                                    {formatPrice({
                                        value: getTotalPrice(),
                                    })}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button
                                    onClick={handleCheckout}
                                    className="mt-4"
                                    disabled={isPending}
                                >
                                    PLACE ORDER {isPending && <Spinner />}
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex flex-col gap-2">
                    <SeatDialog onSetSeat={handleSeatNumber} />
                    {seatNumber && (
                        <p className="my-2 text-primary font-medium">
                            No. seat:{" "}
                            <span className="font-bold">{seatNumber}</span>
                        </p>
                    )}
                    <CouponDialog onSetCoupon={handleCoupon} />
                    {coupon && (
                        <p className="mt-2 text-primary font-medium">
                            <BadgePercentIcon className="mr-1" />
                            {coupon.title} {coupon.discountPercentage}% OFF
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
