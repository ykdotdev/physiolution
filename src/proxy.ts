import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const isLive = process.env.NEXT_PUBLIC_LIVE === 'true'
  const pathname = req.nextUrl.pathname

  // allow coming-soon and Next internals
  if (
    isLive ||
    pathname.startsWith('/coming-soon') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }


  return NextResponse.redirect(new URL('/coming-soon', req.url))
}