/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  headers: () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "no-store",
        },
      ],
    },
  ],
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
