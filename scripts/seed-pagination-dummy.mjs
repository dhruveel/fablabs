import fs from 'fs'
import path from 'path'
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

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('Missing MONGODB_URI (set it in .env.local or the environment)')
  process.exit(1)
}

const COUNT = 30
const now = Date.now()
const hour = 60 * 60 * 1000

const dummyContacts = Array.from({ length: COUNT }, (_, i) => ({
  name: `Dummy Contact ${i + 1}`,
  phone: `90000${String(i + 1).padStart(5, '0')}`,
  email: `dummy.contact.${i + 1}@example.com`,
  subject: `Pagination test subject ${i + 1}`,
  message: `This is dummy contact submission #${i + 1}, generated to test admin pagination.`,
  status: null,
  createdAt: new Date(now - i * hour),
  ip: '203.0.113.1',
}))

const dummyQuotes = Array.from({ length: COUNT }, (_, i) => ({
  name: `Dummy Quote ${i + 1}`,
  phone: `91111${String(i + 1).padStart(5, '0')}`,
  email: `dummy.quote.${i + 1}@example.com`,
  requirements: `Dummy quote requirement #${i + 1}, generated to test admin pagination.`,
  image: null,
  status: null,
  createdAt: new Date(now - i * hour),
  ip: '203.0.113.2',
}))

const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || undefined)

  const contactsResult = await db.collection('contacts').insertMany(dummyContacts)
  console.log(`Inserted ${contactsResult.insertedCount} dummy contact submissions.`)

  const quotesResult = await db.collection('quotes').insertMany(dummyQuotes)
  console.log(`Inserted ${quotesResult.insertedCount} dummy quote requests.`)
} finally {
  await client.close()
}
