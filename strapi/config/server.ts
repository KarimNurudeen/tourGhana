import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Server => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // Behind Railway/Render's reverse proxy, Strapi needs both of these to
  // generate correct absolute URLs and trust X-Forwarded-* headers —
  // without `url`, links in the admin/API would resolve to the internal
  // host instead of the public one.
  url: env('PUBLIC_URL', undefined),
  proxy: env.bool('IS_PROXIED', false),
  app: {
    keys: env.array('APP_KEYS')!,
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});

export default config;
