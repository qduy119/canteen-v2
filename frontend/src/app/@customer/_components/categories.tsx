import { getAllCategories } from "@/services/category";
import CategoryItem from "./category-item";

export default async function CategoryList() {
    const data = await getAllCategories();

    return (
        <div className="mb-10">
            <h1 className="font-semibold text-2xl sm:text-3xl mb-4 w-fit">
                Category
            </h1>
            <ul className="flex flex-wrap gap-x-12 gap-y-5">
                {data?.map((category, index) => (
                    <CategoryItem key={index} category={category} />
                ))}
            </ul>
        </div>
    );
}
