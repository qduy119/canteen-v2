"use server";

import http from "@/lib/http";
import { bearerTokenHeader } from "./utils";
import { ChangePasswordSchemaType } from "@/validations/profile";

export async function updateProfile({
    payload,
    id,
}: {
    payload: FormData;
    id: string;
}) {
    const data = await http.put<any>(`/api/user/${id}`, payload, {
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

export async function changePassword(payload: ChangePasswordSchemaType) {
    const data = await http.put<any>("/api/user/change-password", payload, {
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

export async function forgotPassword() {
    const data = await http.put<any>(
        "/api/user/forgot-password",
        {},
        {
            headers: {
                Authorization: await bearerTokenHeader(),
            },
        }
    );
    
    if (data.status !== 200) {
        return {
            error: data.payload,
        };
    }
}
