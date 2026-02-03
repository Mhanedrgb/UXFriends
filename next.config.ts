import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Skip prerendering API routes to avoid database initialization during build */
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
