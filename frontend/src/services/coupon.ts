import Coupon from "@/types/coupon";

export async function getCoupons(): Promise<Coupon[]> {
    const res = await fetch("/api/coupon", {
        cache: "no-cache",
    });
    const data = await res.json();

    return data;
}
