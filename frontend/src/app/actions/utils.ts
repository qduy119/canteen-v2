"use server";

import "server-only";

import { cookies, headers } from "next/headers";

export async function getCurrentPathname() {
    const header = headers();
    return header.get("x-pathname");
}

export async function checkIsLoggedIn() {
    const cookie = cookies();
    return Boolean(cookie.get("accessToken")?.value);
}

export const bearerTokenHeader = async () => {
    const cookie = cookies();
    return `Bearer ${cookie.get("accessToken")?.value}`;
};

export const setTokenInCookie = async ({
    name,
    value,
    httpOnly,
}: {
    name: string;
    value: string;
    httpOnly: boolean;
}) => {
    const cookie = cookies();
    cookie.set(name, value, {
        httpOnly,
        expires: new Date(
            Date.now() +
                Number(process.env.TOKEN_COOKIE_EXPIRATION) *
                    24 *
                    60 *
                    60 *
                    1000
        ),
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "development" ? false : true,
    });
};
