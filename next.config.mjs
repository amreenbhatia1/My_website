import createMDX from "@next/mdx";

// Set NEXT_PUBLIC_BASE_PATH when hosting under a sub-path, e.g. GitHub Pages
// project sites (https://<user>.github.io/<repo>/ -> "/<repo>").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  poweredByHeader: false,
  reactStrictMode: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
