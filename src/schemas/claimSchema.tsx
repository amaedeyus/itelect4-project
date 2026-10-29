import { z } from "zod";

export const claimSchema = z.object({
  claimantName: z
    .string()
    .min(2, "Name must be at least 2 characters."),

  itemId: z
    .string()
    .min(1, "Please select an item."),

  notes: z
    .string()
    .min(10, "Please provide at least 10 characters of details.")
    .refine(
      (notes) => notes.toLowerCase().includes("item"),
      "Please explain why this item belongs to you."
    ),
});

export type ClaimFormValues = z.infer<typeof claimSchema>;