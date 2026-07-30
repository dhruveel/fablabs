import 'server-only'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db/mongodb'
import { deleteQuoteImage } from '@/lib/storage/quote-images'
import type { LeadStatus } from '@/lib/constants/lead-status'

export interface QuoteImage {
  filename: string // generated name of the file on disk
  originalName: string // user-uploaded filename, for display only
  contentType: string
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

export interface PaginatedResult<T> {
  items: T[]
  total: number
}

export async function listQuoteRequests(
  { page = 1, pageSize = 20 }: { page?: number; pageSize?: number } = {},
): Promise<PaginatedResult<QuoteRequestRecord>> {
  const db = await getDb()
  const collection = db.collection<QuoteRequest>(COLLECTION)
  const skip = (page - 1) * pageSize

  const [docs, total] = await Promise.all([
    collection.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize).toArray(),
    collection.estimatedDocumentCount(),
  ])

  return {
    items: docs.map((doc) => ({
      ...doc,
      status: doc.status ?? null,
      _id: doc._id.toString(),
    })),
    total,
  }
}

export async function getQuoteRequestById(id: string): Promise<QuoteRequestRecord | null> {
  if (!ObjectId.isValid(id)) return null

  const db = await getDb()
  const doc = await db.collection<QuoteRequest>(COLLECTION).findOne({ _id: new ObjectId(id) })
  if (!doc) return null

  return { ...doc, status: doc.status ?? null, _id: doc._id.toString() }
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
  const deleted = await db.collection<QuoteRequest>(COLLECTION).findOneAndDelete({
    _id: new ObjectId(id),
  })

  if (!deleted) return false
  if (deleted.image) {
    await deleteQuoteImage(deleted.image.filename)
  }

  return true
}

export async function deleteQuoteRequests(ids: string[]) {
  const objectIds = ids.filter(ObjectId.isValid).map((id) => new ObjectId(id))
  if (objectIds.length === 0) return 0

  const db = await getDb()
  const collection = db.collection<QuoteRequest>(COLLECTION)

  const toDelete = await collection.find({ _id: { $in: objectIds } }).toArray()
  const result = await collection.deleteMany({ _id: { $in: objectIds } })

  await Promise.all(
    toDelete.filter((doc) => doc.image).map((doc) => deleteQuoteImage(doc.image!.filename)),
  )

  return result.deletedCount
}
