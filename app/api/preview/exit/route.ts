import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

// Convenience route to leave preview mode and go back to seeing the
// published site, since the Strapi-driven /api/preview flow has no other
// way back out once Draft Mode's cookie is set.
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  redirect('/');
}
