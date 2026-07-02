import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import { MongoClient } from 'mongodb'

function loadEnvFile(filename) {
  const filePath = path.resolve(process.cwd(), filename)
  if (!fs.existsSync(filePath)) return

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!(key in process.env)) process.env[key] = value
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const [, , email, password] = process.argv

if (!email || !password) {
  console.error('Usage: pnpm seed-admin <email> <password>')
  process.exit(1)
}

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI (set it in .env.local or the environment)')
  process.exit(1)
}

const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || undefined)
  const passwordHash = await bcrypt.hash(password, 12)
  const normalizedEmail = email.trim().toLowerCase()

  await db.collection('admins').updateOne(
    { email: normalizedEmail },
    {
      $set: { email: normalizedEmail, passwordHash },
      $unset: { resetTokenHash: '', resetTokenExpiresAt: '' },
    },
    { upsert: true },
  )

  console.log(`Admin account ready: ${normalizedEmail}`)
} finally {
  await client.close()
}
