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

// A tiny 1x1 red PNG, used as a placeholder "reference image" for one sample.
const SAMPLE_IMAGE_BASE64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='

const now = Date.now()
const day = 24 * 60 * 60 * 1000

const sampleQuotes = [
  {
    name: 'Divya Krishnan',
    phone: '9845123670',
    email: 'divya.k@example.com',
    requirements:
      'Need 40 polo T-shirts with an embroidered logo for our annual company meet. Deadline is end of next month.',
    image: {
      data: SAMPLE_IMAGE_BASE64,
      contentType: 'image/png',
      filename: 'logo-reference.png',
    },
    createdAt: new Date(now - 2 * day),
    ip: '203.0.113.101',
  },
  {
    name: 'Arjun Reddy',
    phone: '9765012345',
    email: null,
    requirements:
      'Looking for a quote on 100 tote bags with a printed design for a college orientation event.',
    image: null,
    createdAt: new Date(now - 4 * day),
    ip: '203.0.113.115',
  },
  {
    name: 'Meera Pillai',
    phone: '9988001122',
    email: 'meera.pillai@example.com',
    requirements: null,
    image: null,
    createdAt: new Date(now - 6 * day),
    ip: '203.0.113.130',
  },
]

const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || undefined)
  const result = await db.collection('quotes').insertMany(sampleQuotes)
  console.log(`Inserted ${result.insertedCount} sample quote requests.`)
} finally {
  await client.close()
}
