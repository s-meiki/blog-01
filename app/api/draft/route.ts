import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret') || ''
  const slug = req.nextUrl.searchParams.get('slug') || '/'

  const expected = process.env.SANITY_PREVIEW_SECRET || process.env.SANITY_WEBHOOK_SECRET || ''
  if (expected && secret !== expected) {
    return NextResponse.json({ ok: false, message: 'Invalid secret' }, { status: 401 })
  }

  draftMode().enable()

  const url = new URL(req.nextUrl)
  url.pathname = slug.startsWith('/') ? slug : `/${slug}`
  url.search = ''
  return NextResponse.redirect(url)
}

