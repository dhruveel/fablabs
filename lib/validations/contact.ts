import { z } from 'zod'

export const ContactFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(100),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(20),
  email: z.email('Enter a valid email.').trim().max(254),
  subject: z.string().trim().min(2, 'Subject is required.').max(150),
  message: z
    .string()
    .trim()
    .max(5000)
    .optional()
    .transform((val) => (val ? val : undefined)),
  recaptchaToken: z.string().min(1, 'Please complete the reCAPTCHA.'),
})

export type ContactFormInput = z.infer<typeof ContactFormSchema>
