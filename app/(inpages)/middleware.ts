import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from '@clerk/nextjs/server'

// Running in /app/(inpages) scope by folder-level `middleware.ts`
// protects all children paths under /dashboard and similar.
export default async function middleware(req: NextRequest) {
  const { userId, user } = auth(req)

  if (!userId || !user) {
    // redirect to login if not signed in
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  const role = user.publicMetadata?.role
  const emails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map((email) => email.trim().toLowerCase()) || []
  const isAdmin = role === 'admin' || emails.includes((user.emailAddresses?.[0]?.emailAddress || '').toLowerCase())

  if (!isAdmin) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/(inpages)/:path*'],
}
