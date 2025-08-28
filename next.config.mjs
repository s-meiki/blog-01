/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  async headers() {
    const headers = []
    // Allow embedding the site within Sanity Hosted Studio for the preview iframe
    headers.push({
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value:
            "frame-ancestors 'self' https://*.sanity.studio https://meiki-blog-01.sanity.studio",
        },
      ],
    })

    // Optionally discourage indexing on the preview project
    if (process.env.PREVIEW_NOINDEX === '1') {
      headers.push({
        source: '/:path*',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      })
    }

    return headers
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  }
};

export default nextConfig;
