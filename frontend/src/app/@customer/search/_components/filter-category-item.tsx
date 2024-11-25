import Category from "@/types/category";

export default function FilterCategoryItem({
    category,
    onAddCategory,
}: {
    category: Category;
    onAddCategory: (id: number) => void;
}) {
    return (
        <li className="flex items-center gap-2">
            <input
                type="checkbox"
                name={category.name}
                id={category.id.toString()}
                onChange={() => onAddCategory(category.id)}
            />
            <label htmlFor={category.id.toString()}>{category.name}</label>
        </li>
    );
}
