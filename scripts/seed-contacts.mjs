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

const now = Date.now()
const day = 24 * 60 * 60 * 1000

const sampleContacts = [
  {
    name: 'Ananya Rao',
    phone: '9876543210',
    email: 'ananya.rao@example.com',
    subject: 'Custom hoodies for college fest',
    message:
      'Hi, we are organizing our annual college fest in August and need around 200 custom hoodies with our fest logo. Could you share pricing and turnaround time?',
    createdAt: new Date(now - 1 * day),
    ip: '203.0.113.10',
  },
  {
    name: 'Karthik Subramanian',
    phone: '9123456780',
    email: 'karthik.s@example.com',
    subject: 'Startup merch — T-shirts and caps',
    message:
      'We are a early-stage startup looking to order branded T-shirts and caps for our team of 15. Do you offer bulk discounts for small orders?',
    createdAt: new Date(now - 3 * day),
    ip: '203.0.113.24',
  },
  {
    name: 'Priya Menon',
    phone: '9988776655',
    email: 'priya.menon@example.com',
    subject: 'Reprint of previous order',
    message:
      "We ordered 50 T-shirts from you last month (order placed via WhatsApp) and would like to reprint the same design with a different color. Can you check your records?",
    createdAt: new Date(now - 5 * day),
    ip: '203.0.113.42',
  },
  {
    name: 'Rahul Verma',
    phone: '9765432109',
    email: 'rahul.verma@example.com',
    subject: 'Corporate gifting inquiry',
    message:
      'Looking for custom apparel and merchandise for a corporate gifting program ahead of our anniversary event. Please share your catalog and MOQ details.',
    createdAt: new Date(now - 8 * day),
    ip: '203.0.113.58',
  },
  {
    name: 'Sneha Iyer',
    phone: '9012345678',
    email: 'sneha.iyer@example.com',
    subject: 'Delivery timeline question',
    message:
      'Hi team, just wanted to confirm the delivery timeline for an order of 30 custom jerseys before our sports day on the 20th. Is that feasible?',
    createdAt: new Date(now - 10 * day),
    ip: '203.0.113.77',
  },
]

const client = new MongoClient(uri)

try {
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || undefined)
  const result = await db.collection('contacts').insertMany(sampleContacts)
  console.log(`Inserted ${result.insertedCount} sample contact submissions.`)
} finally {
  await client.close()
}
