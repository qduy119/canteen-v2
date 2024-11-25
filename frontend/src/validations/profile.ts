import { Gender } from "../types/user";
import { z } from "zod";

export const profileSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(1, { message: "Full name must be at least 1 character" })
            .optional(),
        phoneNumber: z.string().optional(),
        avatar: z.any(),
        gender: z
            .custom<Gender>(
                (data) => ["Male", "Female", "Other"].includes(data),
                {
                    message: "Gender must be in Male, Female or Other",
                }
            )
            .optional(),
        dateOfBirth: z.date().optional(),
    })
    .strict();

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export const changePasswordSchema = z
    .object({
        currentPassword: z.string().trim().min(8).max(20),
        newPassword: z.string().trim().min(8).max(20),
        confirmNewPassword: z.string().trim().min(8).max(20),
    })
    .strict()
    .required()
    .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
        const regex = new RegExp(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=^.]).{8,20}$/
        );
        if (!regex.test(newPassword)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message:
                    "Password must be 8-20 characters, include at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*()-+=^.)",
                path: ["newPassword"],
            });
        }
        if (confirmNewPassword !== newPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Confirm password is incorrect",
                path: ["confirmNewPassword"],
            });
        }
    });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
