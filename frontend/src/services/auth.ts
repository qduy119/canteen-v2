import { RegisterSchemaType } from "@/validations/register";

export const register = async (payload: RegisterSchemaType) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (res.status === 409) {
        throw new Error("User already exists");
    }

    const data = await res.json();
    return data;
};
