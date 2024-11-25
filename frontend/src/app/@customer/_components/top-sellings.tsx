import FoodItem from "@/components/food-item";
import { getAllTopSellingFoods } from "@/services/food";

export default async function TopSellingFoods() {
    const data = await getAllTopSellingFoods();

    return (
        <div className="mb-10">
            <h1 className="font-semibold text-2xl sm:text-3xl mb-4 w-fit">
                Best Seller
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {data?.map((food, index) => (
                    <FoodItem key={index} food={food} />
                ))}
            </div>
        </div>
    );
}
