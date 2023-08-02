/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src', 'grafbase']
  },
  images: {
    domains: ['lh3.googleusercontent.com']
  }
};

module.exports = nextConfig
