const withImages = require("next-images");
const nextConfig = {
  reactStrictMode: true,
  distDir: "build",
  env: {
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_IMP_UID: process.env.NEXT_PUBLIC_IMP_UID,
  },
  images: {
    loader: "custom",
  },
};

module.exports = withImages(nextConfig);
