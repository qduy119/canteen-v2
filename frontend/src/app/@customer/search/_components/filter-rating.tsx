import React from "react";
import Star from "@/components/star";

export default function FilterRating({
    onFilterRating,
}: {
    onFilterRating: (star: number) => void;
}) {
    return (
        <div className="mt-3">
            {Array.from({ length: 5 }, (_, index) => index + 1)
                .reverse()
                .map((star) => {
                    return (
                        <div
                            key={star}
                            className="flex items-center gap-[2px] mt-1 cursor-pointer hover:-translate-y-[1px] transition-all duration-300"
                            onClick={() => onFilterRating(star)}
                        >
                            <Star n={5} star={star} />
                            <span className="ml-[4px] text-gray-600">
                                {star !== 5 && "& Up"}
                            </span>
                        </div>
                    );
                })}
        </div>
    );
}
