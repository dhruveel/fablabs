import 'server-only'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db/mongodb'
import type { LeadStatus } from '@/lib/constants/lead-status'

export interface QuoteImage {
  data: string // base64
  contentType: string
  filename: string
}

export interface QuoteRequest {
  name: string
  phone: string
  email: string | null
  requirements: string | null
  image: QuoteImage | null
  status: LeadStatus | null
  createdAt: Date
  ip: string | null
}

export interface QuoteRequestRecord extends QuoteRequest {
  _id: string
}

const COLLECTION = 'quotes'

export async function createQuoteRequest(data: Omit<QuoteRequest, 'createdAt' | 'status'>) {
  const db = await getDb()
  const doc: QuoteRequest = { ...data, status: null, createdAt: new Date() }
  const result = await db.collection<QuoteRequest>(COLLECTION).insertOne(doc)
  return result.insertedId
}

export async function listQuoteRequests(): Promise<QuoteRequestRecord[]> {
  const db = await getDb()
  const docs = await db
    .collection<QuoteRequest>(COLLECTION)
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  return docs.map((doc) => ({
    ...doc,
    status: doc.status ?? null,
    _id: doc._id.toString(),
  }))
}

export async function updateQuoteStatus(id: string, status: LeadStatus | null) {
  if (!ObjectId.isValid(id)) return false

  const db = await getDb()
  const result = await db
    .collection<QuoteRequest>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } })

  return result.matchedCount > 0
}

export async function deleteQuoteRequest(id: string) {
  if (!ObjectId.isValid(id)) return false

  const db = await getDb()
  const result = await db.collection<QuoteRequest>(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  })

  return result.deletedCount > 0
}
