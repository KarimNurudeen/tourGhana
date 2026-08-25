import type { Core } from '@strapi/strapi';

// Railway injects RAILWAY_PUBLIC_DOMAIN once a public domain exists, but a
// variable like `https://${{RAILWAY_PUBLIC_DOMAIN}}` resolves to a bare
// `https://` before that happens — and Strapi rejects an unparseable `url`
// with "Invalid server url config", failing the build. Only pass `url`
// through when it actually parses as an absolute URL.
function publicUrl(env: Core.Config.Shared.ConfigParams['env']): string | undefined {
  const candidate =
    env('PUBLIC_URL', '') || (env('RAILWAY_PUBLIC_DOMAIN', '') && `https://${env('RAILWAY_PUBLIC_DOMAIN')}`);

  if (!candidate) return undefined;

  try {
    return new URL(candidate).toString();
  } catch {
    console.warn(`[config/server] Ignoring invalid PUBLIC_URL: ${JSON.stringify(candidate)}`);
    return undefined;
  }
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Behind Railway/Render's reverse proxy, Strapi needs both of these to
  // generate correct absolute URLs and trust X-Forwarded-* headers —
  // without `url`, links in the admin/API would resolve to the internal
  // host instead of the public one.
  url: publicUrl(env),
  proxy: env.bool('IS_PROXIED', false),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
