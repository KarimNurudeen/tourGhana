import type { Core } from '@strapi/strapi';

// Production-only override (Strapi's environment-config convention — this
// file is merged on top of config/plugins.ts only when NODE_ENV=production).
// Local dev keeps using disk storage; production uploads go straight to the
// project's existing Cloudinary account instead, since local disk storage
// doesn't survive redeploys on Railway/Render.
const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
});

export default config;
