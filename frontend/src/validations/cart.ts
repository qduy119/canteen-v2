import { z } from "zod";

export const addToCartSchema = z.object({
    quantity: z.number().positive(),
    itemId: z.number(),
});

export type AddToCartType = z.infer<typeof addToCartSchema>;

export const modifyCartItemSchema = z.object({
    id: z.number(),
    quantity: z.number().positive(),
});

export type ModifyCartItemType = z.infer<typeof modifyCartItemSchema>;