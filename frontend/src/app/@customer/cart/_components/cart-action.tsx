import { Button } from "@/components/ui/button";
import React from "react";

export default function CartAction({ onCheckout }: { onCheckout: () => void }) {
    return (
        <div className="mt-2 flex justify-end px-5">
            <Button
                type="button"
                onClick={onCheckout}
            >
                CHECKOUT
            </Button>
        </div>
    );
}
