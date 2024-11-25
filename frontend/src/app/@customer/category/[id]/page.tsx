"use client";

import ClientError from "@/components/error";
import { getCategoryById } from "@/services/category";
import { getAllFoods } from "@/services/food";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import CategoryPagination from "@/components/custom-pagination";
import FoodsSkeleton from "@/components/foods-skeleton";
import FoodItem from "@/components/food-item";

interface CategoryDetailParam {
    id: string;
}

const PER_PAGE = 10;

export default function CategoryDetail({
    params,
}: {
    params: CategoryDetailParam;
}) {
    const { id } = params;
    const searchParams = useSearchParams();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const { isFetching, isError, error, data } = useQuery({
        queryKey: ["category", id, page],
        queryFn: () =>
            getAllFoods({
                page,
                per_page: PER_PAGE,
                categoryId: id,
                keyword: "",
            }),
    });
    const { data: category } = useQuery({
        queryKey: ["category", id],
        queryFn: () => getCategoryById({ id }),
    });

    return (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <div className="block sm:flex gap-5 items-center mt-5">
                <Image
                    src={category?.thumbnail || ""}
                    alt="Category"
                    width="150"
                    height="150"
                    className="rounded-md"
                />
                <div className="mt-4 sm:mt-0">
                    <p className="font-medium text-2xl mb-2">
                        {category?.name}
                    </p>
                    <p>{category?.description}</p>
                </div>
            </div>
            <div className="mt-10">
                <h1 className="font-semibold text-2xl sm:text-3xl mb-4 w-fit">
                    All items of <span className="bold">{category?.name}</span>
                </h1>
                {isFetching ? (
                    <FoodsSkeleton n_elements={10} />
                ) : isError ? (
                    <ClientError message={error.message} />
                ) : (
                    <div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                            {data?.data?.map((food, index) => (
                                <FoodItem key={index} food={food} />
                            ))}
                        </div>
                        <div className="flex justify-center items-center mt-10">
                            <CategoryPagination
                                total={data?.["total_pages"]}
                                page={page}
                                url={`/category/${id}`}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
