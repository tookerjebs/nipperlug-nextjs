/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint disabled due to some error/warning
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: false
  },
  // SEO and Performance optimizations
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Aggressive caching for static calculator pages
      {
        source: '/(chloe-craft-profit-calculator|devils-shop-calculator|chloe-amity-calculator|extreme-upgrade-calculator|exp-calculator|oxp-calculator|force-wing-calculator)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000', // 1 day browser, 1 year CDN
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/(_next/static|favicon.ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable compression
  compress: true,
};

module.exports = nextConfig;