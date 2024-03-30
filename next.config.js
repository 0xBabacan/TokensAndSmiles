/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  webpack4: true,
  nextConfig,
  // The following part is added only to generate a json file from nextjs app. Otherwise, it'll throw an error
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};