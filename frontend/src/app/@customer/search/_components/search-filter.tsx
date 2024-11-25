import { FilterIcon } from "lucide-react";
import FilterCategory from "./filter-category";
import FilterPrice from "./filter-price";
import FilterRating from "./filter-rating";
import Category from "@/types/category";

export default function SearchFilter({
    categories,
    onAddCategory,
    onApplyFilterPrice,
    onFilterRating,
}: {
    categories?: Category[];
    onAddCategory: (id: number) => void;
    onApplyFilterPrice: (priceRange: { min: number; max: number }) => void;
    onFilterRating: (star: number) => void;
}) {
    return (
        <div className="min-w-max p-2">
            <p className="flex items-center gap-1 font-medium uppercase text-lg">
                <FilterIcon />
                Search filter
            </p>
            <p className="mt-5 font-medium">By category</p>
            <FilterCategory
                categories={categories}
                onAddCategory={onAddCategory}
            />
            <p className="mt-5 font-medium">Price Range</p>
            <FilterPrice onApplyFilterPrice={onApplyFilterPrice} />
            <p className="mt-5 font-medium">Rating</p>
            <FilterRating onFilterRating={onFilterRating} />
        </div>
    );
}
