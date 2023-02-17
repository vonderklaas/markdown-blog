/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    domains: [
      'www.markdownguide.org',
      'avatars.githubusercontent.com',
      'www.patterns.dev',
      'play-lh.googleusercontent.com',
      'thrangra.sirv.com',
      'blog.logrocket.com',
      'miro.medium.com',
    ],
  },
};

module.exports = nextConfig;
