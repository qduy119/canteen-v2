import User from "@/types/user";

export async function getMe(): Promise<User> {
    const res = await fetch("/api/me");
    const data = await res.json();

    return data;
}
