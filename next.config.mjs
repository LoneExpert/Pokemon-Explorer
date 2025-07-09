/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/Pokemon-Explorer',       // ✅ Replace with your actual repo name
  assetPrefix: '/Pokemon-Explorer',    // ✅ Same here for assets like images & CSS
};

export default nextConfig;
