import { bearerTokenHeader } from "@/app/actions/utils";
import http from "@/lib/http";
import User from "@/types/user";
import { NextResponse } from "next/server";

export async function GET() {
    const res = await http.get<User>("/api/me", {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });

    const data = res.payload;

    return NextResponse.json(data);
}
