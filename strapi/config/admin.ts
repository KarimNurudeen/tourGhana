import type { Core } from '@strapi/strapi';

// Maps a content type + entry to the frontend pathname that renders it, so
// the Preview button knows where to send the editor. Only Tour has a
// dedicated public page today — everything else returns null, which hides
// the Preview button on those content types instead of linking somewhere
// broken.
function getPreviewPathname(uid: string, document: Record<string, any>): string | null {
  if (uid !== 'api::tour.tour' || !document.slug) return null;

  const categoryName = document.category?.name;
  if (categoryName === 'Where To Stay') return `/where-to-stay/${document.slug}`;
  if (categoryName === 'Festivals') return `/category/festivals/${document.slug}`;
  return `/tours/${document.slug}`;
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET')!,
  },
  apiToken: {
    salt: env('API_TOKEN_SALT')!,
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT')!,
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY')!,
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    docLinks: env.bool('FLAG_DOC_LINKS', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL')!],
      async handler(uid: string, { documentId, status }: { documentId: string; status?: string }) {
        const document = await strapi.documents(uid as any).findOne({
          documentId,
          populate: ['category'],
        });
        if (!document) return null;

        const pathname = getPreviewPathname(uid, document);
        if (!pathname) return null;

        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: env('PREVIEW_SECRET')!,
          status: status ?? 'draft',
        });
        return `${env('CLIENT_URL')}/api/preview?${urlSearchParams}`;
      },
    },
  },
});

export default config;
