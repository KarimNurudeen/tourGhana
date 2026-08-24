import withSerwistInit from '@serwist/next';

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
  additionalPrecacheEntries: [{ url: '/offline-placeholder.svg', revision: '1' }],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // @react-google-maps/api's script loader misfires under React 18 Strict
  // Mode's dev-only double-mount (it logs a false "failed to load, retrying"
  // before succeeding on the remount) — Strict Mode's double-invoke is a
  // dev-only diagnostic with no effect on the production build, so turning
  // it off here removes the false positive without reducing production
  // correctness.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
    ],
  },
};

export default withSerwist(nextConfig);
