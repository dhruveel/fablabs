import 'server-only'
import { getDb } from '@/lib/db/mongodb'

export interface AdminAccount {
  email: string
  passwordHash: string
  resetTokenHash: string | null
  resetTokenExpiresAt: Date | null
}

const COLLECTION = 'admins'

export async function findAdminByEmail(email: string) {
  const db = await getDb()
  return db.collection<AdminAccount>(COLLECTION).findOne({ email: email.trim().toLowerCase() })
}

export async function setAdminResetToken(email: string, tokenHash: string, expiresAt: Date) {
  const db = await getDb()
  await db
    .collection<AdminAccount>(COLLECTION)
    .updateOne(
      { email: email.trim().toLowerCase() },
      { $set: { resetTokenHash: tokenHash, resetTokenExpiresAt: expiresAt } },
    )
}

export async function resetAdminPassword(tokenHash: string, passwordHash: string) {
  const db = await getDb()
  const result = await db.collection<AdminAccount>(COLLECTION).updateOne(
    { resetTokenHash: tokenHash, resetTokenExpiresAt: { $gt: new Date() } },
    {
      $set: { passwordHash },
      $unset: { resetTokenHash: '', resetTokenExpiresAt: '' },
    },
  )
  return result.matchedCount > 0
}
