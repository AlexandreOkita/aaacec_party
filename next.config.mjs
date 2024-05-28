/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
