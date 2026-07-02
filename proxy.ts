import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth/session'

// Routes that must stay reachable without an existing session.
const OPEN_API_ROUTES = [
  '/api/admin/login',
  '/api/admin/logout',
  '/api/admin/forgot-password',
  '/api/admin/reset-password',
]
const OPEN_ADMIN_PAGES = ['/admin/login', '/admin/forgot-password', '/admin/reset-password']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (OPEN_API_ROUTES.includes(pathname)) {
    return NextResponse.next()
  }

  const session = await verifyAdminSession()

  if (pathname.startsWith('/api/admin')) {
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    }
    return NextResponse.next()
  }

  if (OPEN_ADMIN_PAGES.includes(pathname)) {
    if (session && pathname === '/admin/login') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }

  if (!session) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
