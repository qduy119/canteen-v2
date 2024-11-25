import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function CustomPagination({
    total = 1,
    page = 1,
    url,
}: {
    total?: number;
    page?: number;
    url: string;
}) {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        className={
                            page === 1 ? "opacity-50 pointer-events-none" : ""
                        }
                        href={`${url}?page=${page - 1}`}
                    />
                </PaginationItem>
                {Array.from({ length: total }, (_, i) => i + 1).map((e) => (
                    <PaginationItem key={e}>
                        <PaginationLink
                            href={`${url}?page=${e}`}
                            isActive={e === page ? true : false}
                        >
                            {e}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        className={
                            page === total
                                ? "opacity-50 pointer-events-none"
                                : ""
                        }
                        href={`${url}?page=${page + 1}`}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
