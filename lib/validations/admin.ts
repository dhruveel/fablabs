import { z } from 'zod'

export const AdminLoginSchema = z.object({
  email: z.email('Enter a valid email.').trim(),
  password: z.string().min(1, 'Password is required.'),
})

export type AdminLoginInput = z.infer<typeof AdminLoginSchema>

export const ForgotPasswordSchema = z.object({
  email: z.email('Enter a valid email.').trim(),
})

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>

const passwordRules = z
  .string()
  .min(8, 'Be at least 8 characters long.')
  .regex(/[a-zA-Z]/, 'Contain at least one letter.')
  .regex(/[0-9]/, 'Contain at least one number.')
  .regex(/[^a-zA-Z0-9]/, 'Contain at least one special character.')

export const ResetPasswordSchema = z.object({
  token: z.string().min(1, 'Missing reset token.'),
  password: passwordRules,
})

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>
