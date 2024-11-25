import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CategoriesSkeleton({
    n_elements,
}: {
    n_elements: number;
}) {
    return (
        <div className="mb-10">
            <Skeleton className="h-12 w-36 rounded-md" />
            <div className="mt-4 flex flex-wrap gap-x-12 gap-y-5">
                {Array.from({ length: n_elements }, (_, i) => i + 1).map(
                    (i) => (
                        <div key={i}>
                            <Skeleton className="h-32 w-24 rounded-md" />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
