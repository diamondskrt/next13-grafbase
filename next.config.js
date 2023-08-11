/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src', 'grafbase']
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
  }
};

module.exports = nextConfig
