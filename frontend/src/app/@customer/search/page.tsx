"use client";

import SearchPagination from "@/components/custom-pagination";
import ClientError from "@/components/error";
import FoodItem from "@/components/food-item";
import FoodsSkeleton from "@/components/foods-skeleton";
import Food from "@/types/food";
import { getAllFoods } from "@/services/food";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, InfoIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import SearchFilter from "./_components/search-filter";
import Category from "@/types/category";
import { Button } from "@/components/ui/button";
import { PaginationResponseType } from "@/types/common";
import Link from "next/link";
import {
    getCategoryFromProducts,
    getProductByCondition,
    getProductByPagination,
} from "@/lib/utils";

type GetFoodsResponse = PaginationResponseType<Food>;

const PER_PAGE = 10;

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [keyword, page] = [
        searchParams.get("query") || "",
        parseInt(searchParams.get("page") || "1"),
    ];
    const { isFetching, isError, error, data } = useQuery({
        queryKey: ["search", keyword, page],
        queryFn: () =>
            getAllFoods({
                page,
                per_page: PER_PAGE,
                categoryId: "",
                keyword,
            }),
    });
    const [products, setProducts] = useState<GetFoodsResponse | undefined>(
        undefined
    );
    const [categories, setCategories] = useState<Category[] | undefined>(
        undefined
    );
    const [categoryToFilter, setCategoryToFilter] = useState<
        number[] | undefined
    >(undefined);
    const [priceRange, setPriceRange] = useState<
        | {
              min: number;
              max: number;
          }
        | undefined
    >(undefined);
    const [rating, setRating] = useState<number | undefined>(undefined);

    function handleAddCategory(id: number) {
        if (!categoryToFilter) {
            setCategoryToFilter([id]);
        } else {
            if (categoryToFilter.includes(id)) {
                setCategoryToFilter((prev) => {
                    if (prev) {
                        const temp = [...prev];
                        const indexToDelete = temp.indexOf(id);
                        if (indexToDelete !== -1) {
                            temp.splice(indexToDelete, 1);
                        }
                        return temp.length > 0 ? temp : undefined;
                    } else {
                        return prev;
                    }
                });
            } else {
                setCategoryToFilter((prev) => {
                    if (prev) {
                        return [...prev, id];
                    } else {
                        return prev;
                    }
                });
            }
        }
    }
    function handleApplyFilterPrice(priceRange: { min: number; max: number }) {
        setPriceRange(priceRange);
    }
    function handleFilterRating(star: number) {
        setRating(star);
    }
    function handleClearAll() {
        const { rows, total_pages } = getProductByPagination(
            data?.data || [],
            page,
            10
        );
        setProducts({ data: rows, total_pages });
        setCategoryToFilter(undefined);
        setPriceRange(undefined);
        setRating(undefined);
    }

    useEffect(() => {
        if (data?.data) {
            const productAfter = getProductByCondition(data?.data, {
                categoryToFilter,
                priceRange,
                rating,
            });
            const { rows, total_pages } = getProductByPagination(
                productAfter,
                page,
                10
            );
            setProducts({ data: rows, total_pages });
            setCategories(getCategoryFromProducts(data?.data));
        }
    }, [data?.data, page, categoryToFilter, priceRange, rating]);

    return (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <h1 className="flex items-center gap-2 font-meidum text-2xl sm:text-3xl w-fit my-4">
                <InfoIcon />
                All search for <span className="font-bold">{keyword}</span>
            </h1>
            {isFetching ? (
                <FoodsSkeleton n_elements={10} />
            ) : isError ? (
                <ClientError message={error.message} />
            ) : !data?.data ? (
                <p className="text-2xl font-bold">No result</p>
            ) : (
                <div className="flex gap-8">
                    <div>
                        <SearchFilter
                            categories={categories}
                            onAddCategory={handleAddCategory}
                            onApplyFilterPrice={handleApplyFilterPrice}
                            onFilterRating={handleFilterRating}
                        />
                        <Button
                            className="font-semibold w-full uppercase mt-4"
                            onClick={handleClearAll}
                        >
                            Clear all
                        </Button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {products?.data.map((food, index) => (
                            <FoodItem key={index} food={food} />
                        ))}
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center mt-10">
                <SearchPagination
                    page={page}
                    total={products?.["total_pages"]}
                    url={`/search?query=${keyword}`}
                />
            </div>
        </div>
    );
}
