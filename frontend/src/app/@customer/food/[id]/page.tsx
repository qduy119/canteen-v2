import { getAllFoods, getFoodById } from "@/services/food";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import FoodDetailImage from "./_components/food-detail-image";
import FoodDetailAction from "./_components/food-detail-action";
import FoodReview from "./_components/food-review";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
    const foods = await getAllFoods({});

    return foods.data.map((product) => ({
        id: product.id,
    }));
}

interface ProductDetailParam {
    id: string;
}

export default async function ProductDetail({
    params,
}: {
    params: ProductDetailParam;
}) {
    const { id } = params;
    const { data: food, reviews } = await getFoodById({ id });

    return (
        <div className="p-5">
            <Link
                href="/"
                className="hover:underline text-primary flex items-center w-fit"
            >
                <ChevronLeft />
                BACK TO HOME PAGE
            </Link>
            <div className="block sm:flex gap-x-8 mt-5">
                <FoodDetailImage
                    images={food.images}
                    thumbnail={food.thumbnail}
                />
                <div className="flex-1 mt-8 sm:mt-5">
                    <div>
                        <h3 className="font-semibold text-3xl text-primary-dark">
                            {food.name}
                        </h3>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-bold text-xl uppercase">
                            Description:{" "}
                        </h3>
                        <p>{food.description}</p>
                    </div>
                    <h3 className="font-bold text-xl uppercase mt-4">
                        Rating:{" "}
                        <span className="font-normal">{food.rating}</span>
                    </h3>
                    <h3 className="font-bold text-xl uppercase mt-4">
                        Stock: <span className="font-normal">{food.stock}</span>
                    </h3>
                    <h3 className="font-bold text-xl uppercase mt-4">
                        Price:{" "}
                        <span className="font-normal">${food.price}</span>
                    </h3>
                    <FoodDetailAction stock={food.stock} itemId={food.id} />
                </div>
            </div>
            <div className="mt-10">
                <h1 className="font-semibold text-3xl mb-4">Reviews</h1>
                <FoodReview reviews={reviews} rating={food.rating} />
            </div>
        </div>
    );
}
