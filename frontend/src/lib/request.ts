"use server";

import "server-only";

import { RefreshTokenType } from "@/validations/login";
import { redirect } from "next/navigation";
import { bearerTokenHeader, setTokenInCookie } from "@/app/actions/utils";
import { cookies } from "next/headers";
import { CustomErrorType } from "./utils";

type CustomOptions = Omit<RequestInit, "method"> & {
    baseUrl?: string | undefined;
};

const AUTHENTICATION_ERROR_STATUS = 401;

const request = async <Response>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    options?: CustomOptions | undefined
) => {
    let body: FormData | string | undefined = undefined;
    if (options?.body instanceof FormData) {
        body = options.body;
    } else if (options?.body) {
        body = JSON.stringify(options.body);
    }
    const baseHeaders: {
        [key: string]: string;
    } =
        body instanceof FormData
            ? {}
            : {
                  "Content-Type": "application/json",
              };

    const baseUrl =
        options?.baseUrl === undefined
            ? process.env.NEXT_PUBLIC_SERVER_URL
            : options.baseUrl;

    const fullUrl = url.startsWith("/")
        ? `${baseUrl}${url}`
        : `${baseUrl}/${url}`;

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as any,
        body,
        method,
    });

    const payload: Response = await res.json();

    const data = {
        status: res.status,
        payload,
    };

    if (!res.ok) {
        if (res.status === AUTHENTICATION_ERROR_STATUS) {
            const refreshResponse = await fetch(`${baseUrl}/auth/refresh-token`, {
                headers: {
                    Cookie: cookies().toString(),
                },
                credentials: "include",
            });
            if (!refreshResponse.ok) {
                // if refresh token is expired or not found, or any eror, force user to log out.
                cookies().delete("accessToken");
                cookies().delete("refreshToken");
                cookies().delete("role");
                redirect("/");
            } else {
                const { accessToken } =
                    (await refreshResponse.json()) as RefreshTokenType;
                await setTokenInCookie({
                    name: "accessToken",
                    value: accessToken,
                    httpOnly: true,
                });
                options = {
                    ...options,
                    headers: {
                        ...options?.headers,
                        Authorization: await bearerTokenHeader(),
                    },
                };

                // refetch request
                return request(method, url, options);
            }
        } else {
            return data;
        }
    }
    return data;
};

export default request;
