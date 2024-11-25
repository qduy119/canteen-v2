"use client";

import { getAllFoods } from "@/services/food";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
    const { data: foods } = useQuery({
        queryKey: ["foods"],
        queryFn: () => getAllFoods({}),
    });

    return <div>DashboardPage</div>;
}
