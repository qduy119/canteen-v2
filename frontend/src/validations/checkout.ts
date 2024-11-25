import Cart from "@/types/cart";
import { z } from "zod";

export const proceedOrderSchema = z
    .object({
        orderDate: z.date(),
        total: z.number().positive(),
        seatNumber: z.number().positive().optional(),
        couponCode: z.string().optional(),
        couponTitle: z.string().optional(),
        discountPercentage: z.number().optional(),
        checkoutItems: z
            .custom<Cart[]>()
            .refine((data) => Array.isArray(data) && data.length > 0, {
                message: "Cart items must be not null",
            }),
    })
    .strict();

export type ProceedOrderType = z.infer<typeof proceedOrderSchema>;
