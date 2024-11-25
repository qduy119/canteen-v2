import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="p-5">
            <Skeleton className="h-12 w-36 rounded-md" />
            <div className="mt-8 max-w-full">
                <div className="flex items-center gap-4">
                    <Skeleton className="rounded-full w-12 h-12" />
                    <Skeleton className="h-12 w-28 rounded-md" />
                </div>
                <div className="mt-8">
                    <Skeleton className="h-12 rounded-md mb-4" />
                    <Skeleton className="h-12 rounded-md mb-4" />
                    <Skeleton className="h-12 rounded-md mb-4" />
                    <Skeleton className="h-12 rounded-md mb-4" />
                    <Skeleton className="h-12 rounded-md mb-8" />
                </div>
                <div className="flex justify-end">
                    <Skeleton className="h-16 w-32 rounded-md" />
                </div>
            </div>
        </div>
    );
}
