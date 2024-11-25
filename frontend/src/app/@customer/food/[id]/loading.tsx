import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function Loading() {
    return (
        <div className="p-5">
            <Skeleton className="h-6 w-48" />
            <div className="block sm:flex gap-x-8 mt-5">
                <div className="flex-1">
                    <Skeleton className="w-full h-96" />
                    <div className="flex flex-wrap gap-5 mt-8">
                        <Skeleton className="w-32 h-32" />
                        <Skeleton className="w-32 h-32" />
                        <Skeleton className="w-32 h-32" />
                    </div>
                </div>
                <div className="flex-1">
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-6 w-48 mb-4" />
                    <Skeleton className="h-6 w-48 mb-8" />
                    <div className="flex gap-x-5">
                        <Skeleton className="h-12 w-1/2" />
                        <Skeleton className="h-12 w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
