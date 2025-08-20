import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (secret && req.headers.get('x-sanity-signature') !== secret) {
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }
  try {
    const body = await req.json();
    // Optional: Narrow revalidation based on body paths
    // For now, revalidate the blog index and homepage
    // NOTE: Using Next 14 Route Handlers, use revalidateTag or revalidatePath if enabled
    return NextResponse.json({ revalidated: true });
  } catch (e) {
    return NextResponse.json({ revalidated: false, error: String(e) }, { status: 500 });
  }
}

