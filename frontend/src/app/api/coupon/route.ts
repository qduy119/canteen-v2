import { bearerTokenHeader } from "@/app/actions/utils";
import Coupon from "@/types/coupon";
import http from "@/lib/http";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await http.get<Coupon[]>("/api/coupon", {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });

    const data = res.payload;

    return NextResponse.json(data);
}
