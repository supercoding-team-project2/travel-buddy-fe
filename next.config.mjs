/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "maps.googleapis.com",
      "ecommerce2nd.s3.ap-northeast-2.amazonaws.com",
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: true,
  },
};

export default nextConfig;
