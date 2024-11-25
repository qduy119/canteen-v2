"use server";

import http from "@/lib/http";
import { bearerTokenHeader } from "./utils";

export async function addReview(payload: FormData) {
    const data = await http.post<any>("/api/review", payload, {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
    });

    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}
