import * as z from "zod"

export const newsletterSchema = z.object({
    email: z
        .string()
        .min(1, "البريد الإلكتروني مطلوب")
        .email("البريد الإلكتروني غير صالح")
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
