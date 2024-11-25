import { getCheckoutCartItems } from "@/app/actions/checkout";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import CheckoutDetail from "./_components/checkout-detail";

export default async function CheckoutPage() {
    const items = await getCheckoutCartItems();

    return (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <div className="mt-4">
                <CheckoutDetail items={items} />
            </div>
        </div>
    );
}