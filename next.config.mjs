import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Only the LinkPreview screenshot service is fetched remotely. A `**`
    // hostname would let anyone drive /_next/image against arbitrary origins.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
    ],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  rewrites: async () => [
    {
      source: '/sitemap.xml',
      destination: '/dynamic-sitemap',
    },
  ],
};

export default withNextIntl(nextConfig);
