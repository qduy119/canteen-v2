import { Suspense } from "react";
import CategoryList from "./_components/categories";
import CategoriesSkeleton from "./_components/categories-skeleton";
import FoodsSkeleton from "../../components/foods-skeleton";
import TopSellingFoods from "./_components/top-sellings";
import FoodList from "./_components/foods";

export default function CustomerPage() {
    return (
        <div className="p-4">
            <Suspense fallback={<CategoriesSkeleton n_elements={5} />}>
                <CategoryList />
            </Suspense>
            <Suspense fallback={<FoodsSkeleton n_elements={10} />}>
                <TopSellingFoods />
            </Suspense>
            <FoodList />
        </div>
    );
}
