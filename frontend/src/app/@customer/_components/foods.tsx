"use client";

import { getAllFoods } from "@/services/food";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import HomePagination from "@/components/custom-pagination";
import ClientError from "@/components/error";
import FoodsSkeleton from "@/components/foods-skeleton";
import FoodItem from "@/components/food-item";

const PER_PAGE = 10;

export default function FoodList() {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const { isFetching, isError, error, data } = useQuery({
        queryKey: ["foods", page],
        queryFn: () =>
            getAllFoods({
                page,
                per_page: PER_PAGE,
                categoryId: "",
                keyword: "",
            }),
    });

    return isFetching ? (
        <FoodsSkeleton n_elements={10} />
    ) : isError ? (
        <ClientError message={error.message} />
    ) : (
        <div>
            <h1 className="font-semibold text-2xl sm:text-3xl mb-4 w-fit">
                List Food Today
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {data?.data?.map((food, index) => (
                    <FoodItem key={index} food={food} />
                ))}
            </div>
            <div className="flex justify-center items-center mt-10">
                <HomePagination
                    total={data?.["total_pages"]}
                    page={page}
                    url="/"
                />
            </div>
        </div>
    );
}
