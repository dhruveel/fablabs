import 'server-only'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db/mongodb'
import type { LeadStatus } from '@/lib/constants/lead-status'

export interface ContactSubmission {
  name: string
  phone: string
  email: string
  subject: string
  message: string | null
  status: LeadStatus | null
  createdAt: Date
  ip: string | null
}

export interface ContactSubmissionRecord extends ContactSubmission {
  _id: string
}

const COLLECTION = 'contacts'

export async function createContactSubmission(
  data: Omit<ContactSubmission, 'createdAt' | 'status'>,
) {
  const db = await getDb()
  const doc: ContactSubmission = { ...data, status: null, createdAt: new Date() }
  const result = await db.collection<ContactSubmission>(COLLECTION).insertOne(doc)
  return result.insertedId
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
}

export async function listContactSubmissions(
  { page = 1, pageSize = 20 }: { page?: number; pageSize?: number } = {},
): Promise<PaginatedResult<ContactSubmissionRecord>> {
  const db = await getDb()
  const collection = db.collection<ContactSubmission>(COLLECTION)
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

export async function updateContactStatus(id: string, status: LeadStatus | null) {
  if (!ObjectId.isValid(id)) return false

  const db = await getDb()
  const result = await db
    .collection<ContactSubmission>(COLLECTION)
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } })

  return result.matchedCount > 0
}

export async function deleteContactSubmission(id: string) {
  if (!ObjectId.isValid(id)) return false

  const db = await getDb()
  const result = await db.collection<ContactSubmission>(COLLECTION).deleteOne({
    _id: new ObjectId(id),
  })

  return result.deletedCount > 0
}

export async function deleteContactSubmissions(ids: string[]) {
  const objectIds = ids.filter(ObjectId.isValid).map((id) => new ObjectId(id))
  if (objectIds.length === 0) return 0

  const db = await getDb()
  const result = await db
    .collection<ContactSubmission>(COLLECTION)
    .deleteMany({ _id: { $in: objectIds } })

  return result.deletedCount
}
