import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth/session'
import { listQuoteRequests } from '@/lib/db/quote'
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
import { QuoteImageCell } from './_quote-image-cell'
import { StatusSelect } from '../_status-select'
import { DeleteRowButton } from '../_delete-row-button'

export default async function AdminQuotesPage() {
  const session = await verifyAdminSession()
  if (!session) {
    redirect('/admin/login')
  }

  const quotes = await listQuoteRequests()

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Quote Requests</h1>
          <Badge variant="secondary">{quotes.length}</Badge>
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
              <TableHead>Requirements</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground">
                  No quote requests yet.
                </TableCell>
              </TableRow>
            ) : (
              quotes.map((q) => (
                <TableRow key={q._id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(q.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>{q.name}</TableCell>
                  <TableCell>{q.phone}</TableCell>
                  <TableCell>{q.email ?? '—'}</TableCell>
                  <TableCell className="max-w-80 whitespace-normal">
                    {q.requirements ?? '—'}
                  </TableCell>
                  <TableCell>
                    {q.image ? (
                      <QuoteImageCell
                        src={`data:${q.image.contentType};base64,${q.image.data}`}
                        filename={q.image.filename}
                      />
                    ) : (
                      '—'
                    )}
                  </TableCell>
                  <TableCell>
                    <StatusSelect resource="quotes" id={q._id} status={q.status} />
                  </TableCell>
                  <TableCell>
                    <DeleteRowButton resource="quotes" id={q._id} name={q.name} />
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
