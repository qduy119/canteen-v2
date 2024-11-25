import Image from "next/image";
import Food from "@/types/food";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import FoodItemAction from "./food-item-action";

export default function FoodItem({ food }: { food: Food }) {
    return (
        <div className="rounded-md hover:-translate-y-2 transition-all duration-500 border-2 overflow-hidden shadow-md">
            <div>
                <Link
                    href={`/food/${food.id}`}
                    className="block relative max-w-full h-[200px]"
                >
                    <Image
                        src={food.thumbnail}
                        alt="Thumbnail"
                        className="top-0 left-0 object-cover"
                        fill={true}
                    />
                </Link>
                <div className="px-4 py-3 ">
                    <p className="font-semibold text-xl text-center">
                        {food.name}
                    </p>
                    <p className="text-center mt-2 text-primary font-bold">
                        {formatPrice({
                            value: food.price * (1 - food.discount * 0.01),
                        })}
                        <span className="text-red-600 font-semibold line-through ml-4">
                            {food.discount}%
                        </span>
                    </p>
                    <p className="text-center mt-2 font-semibold">
                        Stock: {food.stock}
                    </p>
                </div>
            </div>
            <div className="p-2 sm:p-4">
                <div className="flex items-center justify-center gap-x-2 flex-wrap">
                    <FoodItemAction id={food.id} />
                </div>
            </div>
        </div>
    );
}
