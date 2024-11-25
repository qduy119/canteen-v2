import { bearerTokenHeader } from "@/app/actions/utils";
import Order from "@/types/order";
import http from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";
import queryString from "querystring";

interface GetOrdersResponse {
    data: Order[];
    total_pages?: number;
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || "1";
    const per_page = searchParams.get("per_page") || "10";

    const data = await http.get<GetOrdersResponse>(
        `/api/order?${queryString.stringify({ page, per_page })}`,
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );

    return NextResponse.json(data.payload);
}
