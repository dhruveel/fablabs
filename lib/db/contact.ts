import 'server-only'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/db/mongodb'
import type { LeadStatus } from '@/lib/constants/lead-status'

export interface ContactSubmission {
  name: string
  phone: string
  email: string
  subject: string
  message: string
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

export async function listContactSubmissions(): Promise<ContactSubmissionRecord[]> {
  const db = await getDb()
  const docs = await db
    .collection<ContactSubmission>(COLLECTION)
    .find()
    .sort({ createdAt: -1 })
    .toArray()

  return docs.map((doc) => ({
    ...doc,
    status: doc.status ?? null,
    _id: doc._id.toString(),
  }))
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
