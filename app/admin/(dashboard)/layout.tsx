import { redirect } from 'next/navigation'
import { verifyAdminSession } from '@/lib/auth/session'
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { AdminSidebar } from './_admin-sidebar'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifyAdminSession()
  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <div className="flex items-center gap-2 border-b border-border px-4 py-3 md:hidden">
            <SidebarTrigger />
            <span className="text-sm font-medium">FabLabs Admin</span>
          </div>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
