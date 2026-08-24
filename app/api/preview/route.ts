import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

// Strapi's "Preview" button in the admin hits this route (see the
// `preview.config.handler` in strapi/config/admin.ts) with a secret, the
// pathname to open, and whether it's previewing a draft or the published
// version. On a match it flips Next's Draft Mode cookie and redirects into
// the real page, which then fetches draft content for this response only.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const url = searchParams.get('url');
  const status = searchParams.get('status');

  if (!secret || secret !== process.env.PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 });
  }
  if (!url || !url.startsWith('/')) {
    return new Response('Missing or invalid url', { status: 400 });
  }

  const draft = await draftMode();
  if (status === 'published') {
    draft.disable();
  } else {
    draft.enable();
  }

  redirect(url);
}
