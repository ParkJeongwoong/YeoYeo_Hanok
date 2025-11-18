var withImages = require("next-images");

var nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_IMP_UID: process.env.NEXT_PUBLIC_IMP_UID,
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
