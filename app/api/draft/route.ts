import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(req: NextRequest) {
  const secret =
    req.nextUrl.searchParams.get('secret') ||
    req.headers.get('x-sanity-signature') ||
    req.headers.get('X-Sanity-Signature') ||
    ''
  const slugParam = req.nextUrl.searchParams.get('slug') || ''
  const idParam = req.nextUrl.searchParams.get('id') || ''
  const bypass = req.nextUrl.searchParams.get('x-vercel-protection-bypass') || ''
  const setBypass = req.nextUrl.searchParams.get('x-vercel-set-bypass-cookie') || ''

  const noAuth = process.env.PREVIEW_NO_AUTH === '1'
  const expected = process.env.SANITY_PREVIEW_SECRET || process.env.SANITY_WEBHOOK_SECRET || ''
  if (!noAuth) {
    if (expected && secret !== expected) {
      return NextResponse.json({ ok: false, message: 'Invalid secret' }, { status: 401 })
    }
  }

  draftMode().enable()

  // Resolve redirect target
  let targetPath = '/'
  if (slugParam) {
    targetPath = slugParam.startsWith('/') ? slugParam : `/${slugParam}`
  } else if (idParam) {
    // Try to resolve slug from document id; if missing, fallback to preview page by id
    try {
      const client = getSanityClient(true)
      if (client) {
        const res = await client.fetch(
          `*[_id == $id][0]{ 'slug': slug.current }`,
          { id: idParam },
          { cache: 'no-store' as any }
        )
        const slug = res?.slug
        if (slug) {
          targetPath = `/blog/${slug}`
        } else {
          targetPath = `/preview/post`
        }
      } else {
        targetPath = `/preview/post`
      }
    } catch {
      targetPath = `/preview/post`
    }
  }

  const url = new URL(req.nextUrl)
  url.pathname = targetPath
  // Preserve Vercel bypass params on the redirected URL so that the cookie can be set
  const params = new URLSearchParams()
  if (idParam && targetPath === '/preview/post') params.set('id', idParam)
  if (bypass) params.set('x-vercel-protection-bypass', bypass)
  if (setBypass) params.set('x-vercel-set-bypass-cookie', setBypass)
  url.search = params.toString()
  return NextResponse.redirect(url)
}
