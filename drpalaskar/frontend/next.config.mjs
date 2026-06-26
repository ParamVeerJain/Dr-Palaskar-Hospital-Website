/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Local images are served from /public/assets/media — no remote loader needed.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
