import { bearerTokenHeader } from "@/app/actions/utils";
import Seat from "@/types/seat";
import http from "@/lib/http";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await http.get<Seat[]>("/api/seat-reservation", {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });

    const data = res.payload;

    return NextResponse.json(data);
}
