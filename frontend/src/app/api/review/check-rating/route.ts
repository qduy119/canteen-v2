import { bearerTokenHeader } from "@/app/actions/utils";
import http from "@/lib/http";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const orderItemId = searchParams.get("orderItemId");

    const data = await http.get<any>(
        `/api/review/check-rating/${orderItemId}`,
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );

    return NextResponse.json(data.payload);
}
