import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth/session'
import { listQuoteRequests } from '@/lib/db/quote'
import { ADMIN_PAGE_SIZE } from '@/lib/constants/pagination'
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
import { RowSelectionProvider } from '../_row-selection'
import { SelectAllCheckbox } from '../_select-all-checkbox'
import { SelectRowCheckbox } from '../_select-row-checkbox'
import { BulkDeleteBar } from '../_bulk-delete-bar'
import { AdminPagination } from '../_admin-pagination'

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const session = await verifyAdminSession()
  if (!session) {
    redirect('/admin/login')
  }

  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(pageParam) || 1)

  const { items: quotes, total } = await listQuoteRequests({ page, pageSize: ADMIN_PAGE_SIZE })
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_PAGE_SIZE))

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-8">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hidden md:flex" />
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Quote Requests</h1>
          <Badge variant="secondary">{total}</Badge>
        </div>
      </div>

      <RowSelectionProvider pageIds={quotes.map((q) => q._id)}>
        <BulkDeleteBar resource="quotes" />

        <div className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <SelectAllCheckbox />
                </TableHead>
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
                  <TableCell colSpan={9} className="text-center text-muted-foreground">
                    No quote requests yet.
                  </TableCell>
                </TableRow>
              ) : (
                quotes.map((q) => (
                  <TableRow key={q._id}>
                    <TableCell>
                      <SelectRowCheckbox id={q._id} name={q.name} />
                    </TableCell>
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
                          src={`/api/admin/quotes/${q._id}/image`}
                          filename={q.image.originalName}
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
      </RowSelectionProvider>

      <AdminPagination basePath="/admin/quotes" page={page} totalPages={totalPages} />
    </div>
  )
}
