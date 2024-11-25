import { z } from "zod";

export const loginSchema = z
    .object({
        email: z.string().email({ message: "Email is invalid" }),
        password: z.string().trim().min(8).max(20),
    })
    .strict()
    .required();

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const loginResponseSchema = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
});

export type LoginResponseType = z.infer<typeof loginResponseSchema>;

export const refreshTokenSchema = z.object({
    accessToken: z.string(),
});

export type RefreshTokenType = z.infer<typeof refreshTokenSchema>;
