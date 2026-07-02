import { z } from 'zod'

export const QuoteFormSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(100),
  phone: z.string().trim().min(7, 'Enter a valid phone number.').max(20),
  email: z.email('Enter a valid email.').trim().max(254).optional(),
  requirements: z.string().trim().max(5000).optional(),
})

export type QuoteFormInput = z.infer<typeof QuoteFormSchema>
