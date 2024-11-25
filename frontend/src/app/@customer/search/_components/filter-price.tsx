import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function FilterPrice({
    onApplyFilterPrice,
}: {
    onApplyFilterPrice: (priceRange: { min: number; max: number }) => void;
}) {
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: Number.MAX_SAFE_INTEGER,
    });

    function handleChangePrice(e: React.ChangeEvent<HTMLInputElement>) {
        if (Number.isInteger(+e.target.value) && Number(e.target.value) > 0) {
            setPriceRange((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    }
    function handleApplyFilterPrice() {
        onApplyFilterPrice(priceRange);
        setPriceRange({
            min: 0,
            max: Number.MAX_SAFE_INTEGER,
        });
    }

    return (
        <div className="mt-3">
            <div className="mb-2">
                <label htmlFor="min-price hidden"></label>
                <input
                    type="text"
                    name="min"
                    id="min-price"
                    className="border-[1px] border-gray-300 rounded-sm w-[70px] h-[40px] p-2 outline-none"
                    placeholder="$ MIN"
                    onChange={handleChangePrice}
                    value={priceRange.min === 0 ? "" : priceRange.min}
                />
                <label htmlFor="max-price hidden"></label>
                <span className="text-gray-300 text-lg font-semibold mx-2">
                    —
                </span>
                <input
                    type="text"
                    name="max"
                    id="max-price"
                    className="border-[1px] border-gray-300 rounded-sm w-[70px] h-[40px] p-2 outline-none"
                    placeholder="$ MAX"
                    onChange={handleChangePrice}
                    value={
                        priceRange.max === Number.MAX_SAFE_INTEGER
                            ? ""
                            : priceRange.max
                    }
                />
            </div>
            <Button
                className="font-semibold w-full uppercase"
                onClick={handleApplyFilterPrice}
            >
                Apply
            </Button>
        </div>
    );
}
