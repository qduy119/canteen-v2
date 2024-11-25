"use server";

import http from "@/lib/http";
import { LoginResponseType, LoginSchemaType } from "@/validations/login";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { bearerTokenHeader, setTokenInCookie } from "./utils";
import Role from "@/types/role";

type TokenDecode = {
    id: string;
    role: Role;
};

export async function login(payload: LoginSchemaType) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/authenticate`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    if (res.status === 409) {
        return {
            error: {
                statusCode: 409,
                message: "Email or password is incorrect",
            },
        };
    } else if (res.status === 404) {
        return {
            error: {
                statusCode: 404,
                message: "User not found",
            },
        };
    }

    if (res.ok) {
        const { accessToken, refreshToken } =
            (await res.json()) as LoginResponseType;

        const decoded = jwtDecode(accessToken) as TokenDecode;

        await setTokenInCookie({
            name: "role",
            value: decoded.role,
            httpOnly: true,
        });
        await setTokenInCookie({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
        });
        await setTokenInCookie({
            name: "refreshToken",
            value: refreshToken,
            httpOnly: true,
        });
    } else {
        const data = await res.json();
        return {
            error: data,
        };
    }
}

export async function logout() {
    const cookie = cookies();

    const data = await http.post<any>(
        "/auth/logout",
        {},
        {
            headers: {
                Authorization: await bearerTokenHeader(),
                Cookie: cookie.toString(),
            },
        }
    );

    if (data.status === 200) {
        cookie.delete("accessToken");
        cookie.delete("refreshToken");
        cookie.delete("role");
    } else {
        return {
            error: data.payload,
        };
    }
}
