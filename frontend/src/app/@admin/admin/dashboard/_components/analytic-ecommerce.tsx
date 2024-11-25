import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export default function AnalyticEcommerce({
    title,
    count,
}: {
    title: string;
    count: number;
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-end">{count}</p>
            </CardContent>
        </Card>
    );
}
