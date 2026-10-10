var withImages = require("next-images");

var nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
  images: {
    loader: "custom",
  },
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = withImages(nextConfig);
