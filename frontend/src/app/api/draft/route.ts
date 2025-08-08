import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { client } from '@/sanity/client'
import { token } from '@/sanity/token'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  const { isEnabled } = draftMode()

  if (isEnabled) {
    draftMode().disable()
  } else {
    draftMode().enable()
  }

  redirect(`/post/${slug}`)
}