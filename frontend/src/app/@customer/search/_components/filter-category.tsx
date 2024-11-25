import React from "react";
import FilterCategoryItem from "./filter-category-item";
import Category from "@/types/category";

export default function FilterCategory({
    categories,
    onAddCategory,
}: {
    categories?: Category[];
    onAddCategory: (id: number) => void;
}) {
    return (
        <ul className="mt-3">
            {categories?.map((category, index) => (
                <FilterCategoryItem
                    key={index}
                    category={category}
                    onAddCategory={onAddCategory}
                />
            ))}
        </ul>
    );
}
