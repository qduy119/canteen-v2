"use server";

import http from "@/lib/http";
import Role from "@/types/role";
import User from "@/types/user";
import { bearerTokenHeader, checkIsLoggedIn } from "./utils";
import { cookies } from "next/headers";

export async function getRole(): Promise<Role> {
    return cookies().get("role")?.value as Role;
}

export async function checkUserRole(): Promise<Role | undefined> {
    const isLoggedIn = await checkIsLoggedIn();
    if (!isLoggedIn) return undefined;

    const role = await getRole();
    return role;
}

export async function getUser() {
    const isLoggedIn = await checkIsLoggedIn();
    if (!isLoggedIn) return undefined;

    const data = await http.get<User>("/api/me", {
        headers: {
            Authorization: await bearerTokenHeader(),
        },
        cache: "force-cache",
        next: {
            tags: ["user"],
        },
    });

    return data.payload;
}
