import Category from "@/types/category";

export const getAllCategories = async (): Promise<Category[]> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category`
    );
    if (!res.ok) {
        throw new Error("Error fetching");
    }
    const data = await res.json();

    return data;
};

export const getCategoryById = async ({
    id,
}: {
    id: string;
}): Promise<Category> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/category/${id}`
    );
    if (!res.ok) {
        throw new Error("Error fetching");
    }
    const data = await res.json();

    return data;
};
