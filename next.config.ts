import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // There are other lockfiles higher up the Desktop tree; pin the root here so
  // the bundler doesn't pick one of those as the workspace.
  turbopack: { root: import.meta.dirname },

  // Photos live in /public/fotky and are served locally, so no remote patterns
  // are needed. If the client ever hosts photos elsewhere, add the host here.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
