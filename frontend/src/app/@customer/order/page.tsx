"use client";

import { getAllOrders } from "@/services/order";
import { useQuery } from "@tanstack/react-query";
import OrderPagination from "@/components/custom-pagination"
import ClientError from "@/components/error";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import OrderDetail from "./_components/order-detail";
import OrdersSkeleton from "@/components/orders-skeleton";

const PER_PAGE = 10;

export default function OrderPage() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const { isFetching, isError, error, data } = useQuery({
        queryKey: ["orders", page],
        queryFn: () => getAllOrders({
            page,
            per_page: PER_PAGE,
        }),
    });

    return isFetching ? (
        <OrdersSkeleton n_elements={10} />
    ) : isError ? (
        <ClientError message={error.message} />
    ) : (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <div className="mt-4">
              <OrderDetail orders={data?.data} />
            </div>
            <div className="flex justify-center items-center mt-10">
                <OrderPagination
                    total={data?.["total_pages"]}
                    page={page}
                    url="/order"
                />
            </div>
        </div>
    );
}
