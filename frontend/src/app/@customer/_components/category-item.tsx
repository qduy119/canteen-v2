import Category from "@/types/category";
import Image from "next/image";
import Link from "next/link";

export default function CategoryItem({ category }: { category: Category }) {
    return (
        <li className="hover:scale-110 transition-all duration-500">
            <Link href={`/category/${category.id}`}>
                <Image
                    src={category.thumbnail}
                    alt="Thumbnail"
                    width="81"
                    height="81"
                    className="rounded-md"
                />
                <p className="text-center font-medium max-w-[81px]">
                    {category.name}
                </p>
            </Link>
        </li>
    );
}
