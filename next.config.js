/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: [
    'react-image-annotate',
    'react-material-workspace-layout',
  ],
}

module.exports = nextConfig
