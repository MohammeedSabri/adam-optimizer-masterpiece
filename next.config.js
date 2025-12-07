/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'img.freepik.com',
      'pbs.twimg.com',
      'i.ytimg.com',
      'towardsdatascience.com',
      'blog.paperspace.com',
      'dzlab.github.io',
      'miro.medium.com',
      'www.cs.us.es',
      'ruder.io',
      'placehold.co'
    ],
  },
}

module.exports = nextConfig