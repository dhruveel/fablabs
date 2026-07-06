import 'server-only'
import { Db, MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

// Cache the client across hot reloads in dev and across warm lambda
// invocations in prod so we don't open a new connection per request.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>
  _mongoIndexesPromise?: Promise<unknown>
}

const client = globalForMongo._mongoClientPromise
  ? undefined
  : new MongoClient(uri)

const clientPromise = globalForMongo._mongoClientPromise ?? client!.connect()

if (!globalForMongo._mongoClientPromise) {
  globalForMongo._mongoClientPromise = clientPromise
}

// createIndex() is a no-op when an equivalent index already exists, so it's
// safe to call on every cold start. Memoized so warm invocations don't repeat
// the round trip.
function ensureIndexes(db: Db) {
  if (!globalForMongo._mongoIndexesPromise) {
    globalForMongo._mongoIndexesPromise = Promise.all([
      db.collection('admins').createIndex({ email: 1 }, { unique: true }),
      db
        .collection('admins')
        .createIndex({ resetTokenHash: 1, resetTokenExpiresAt: 1 }, { sparse: true }),
      db.collection('contacts').createIndex({ createdAt: -1 }),
      db.collection('quotes').createIndex({ createdAt: -1 }),
      db.collection('rate_limits').createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]).catch((err) => {
      globalForMongo._mongoIndexesPromise = undefined
      console.error('Failed to ensure MongoDB indexes:', err)
    })
  }
  return globalForMongo._mongoIndexesPromise
}

export async function getDb() {
  const client = await clientPromise
  const db = client.db(process.env.MONGODB_DB || undefined)
  await ensureIndexes(db)
  return db
}
