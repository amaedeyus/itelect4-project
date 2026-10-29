
import { z } from "zod";

export const aiReviewFormSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(20, "Please enter at least 20 characters.")
    .max(2000, "Please keep the report under 2000 characters."),
});

export type AiReviewFormValues = z.infer<
  typeof aiReviewFormSchema
>;
