import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersSkeleton({ n_elements }: { n_elements: number }) {
    return (
        <div className="p-5">
            <Skeleton className="h-12 w-36 rounded-md" />
            <div className="mt-4 max-w-full">
                {Array.from({ length: n_elements }, (_, i) => i + 1).map(
                    (i) => (
                        <div key={i}>
                            <Skeleton className="h-12 w-full rounded-md mb-4" />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
