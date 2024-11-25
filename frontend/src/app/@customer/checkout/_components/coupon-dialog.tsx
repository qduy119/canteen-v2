import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Coupon from "@/types/coupon";
import { useQuery } from "@tanstack/react-query";
import { ChevronRightIcon } from "lucide-react";
import { useRef, useState } from "react";
import CouponItem from "./coupon-item";
import { getCoupons } from "@/services/coupon";

export default function CouponDialog({
    onSetCoupon,
}: {
    onSetCoupon: (code: Coupon) => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [coupon, setCoupon] = useState<Coupon | null>(null);
    const { data: coupons } = useQuery({
        queryFn: () => getCoupons(),
        queryKey: ["coupon"],
    });

    function handleSetCoupon(coupon: Coupon) {
        setCoupon(coupon);
    }
    function handleSave() {
        if (coupon) {
            onSetCoupon(coupon);
            ref.current?.click();
        }
    }

    return (
        <Dialog>
            <DialogTrigger ref={ref} asChild>
                <Button
                    variant="outline"
                    className="border-primary text-primary w-fit"
                >
                    Coupon
                    <ChevronRightIcon />
                </Button>
            </DialogTrigger>
            <DialogContent aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Choose a coupon</DialogTitle>
                </DialogHeader>
                <div>
                    {coupons?.map((coupon, index) => (
                        <CouponItem
                            coupon={coupon}
                            key={index}
                            onSetCoupon={handleSetCoupon}
                        />
                    ))}
                </div>
                <DialogFooter className="!justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    {coupon && (
                        <Button type="submit" onClick={handleSave}>
                            Save
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
