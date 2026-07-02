import 'server-only'
import bcrypt from 'bcryptjs'
import { findAdminByEmail } from '@/lib/db/admin'

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await findAdminByEmail(email)
  if (!admin) return false
  return bcrypt.compare(password, admin.passwordHash)
}
