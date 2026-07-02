import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth/session'
import { listContactSubmissions } from '@/lib/db/contact'
import { Badge } from '@/components/ui/badge'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { StatusSelect } from './_status-select'
import { DeleteRowButton } from './_delete-row-button'

export default async function AdminContactsPage() {
  const session = await verifyAdminSession()
  if (!session) {
    redirect('/admin/login')
  }

  const contacts = await listContactSubmissions()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Contact Submissions</h1>
          <Badge variant="secondary">{contacts.length}</Badge>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Received</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No submissions yet.
                </TableCell>
              </TableRow>
            ) : (
              contacts.map((c) => (
                <TableRow key={c._id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.subject}</TableCell>
                  <TableCell className="max-w-80 whitespace-normal">{c.message}</TableCell>
                  <TableCell>
                    <StatusSelect resource="contacts" id={c._id} status={c.status} />
                  </TableCell>
                  <TableCell>
                    <DeleteRowButton resource="contacts" id={c._id} name={c.name} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
