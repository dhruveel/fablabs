import 'server-only'
import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Missing MONGODB_URI environment variable')
}

// Cache the client across hot reloads in dev and across warm lambda
// invocations in prod so we don't open a new connection per request.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>
}

const client = globalForMongo._mongoClientPromise
  ? undefined
  : new MongoClient(uri)

const clientPromise = globalForMongo._mongoClientPromise ?? client!.connect()

if (!globalForMongo._mongoClientPromise) {
  globalForMongo._mongoClientPromise = clientPromise
}

export async function getDb() {
  const client = await clientPromise
  return client.db(process.env.MONGODB_DB || undefined)
}
