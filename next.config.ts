import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "docuradafazenda.com.br",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/products",
        destination: "/produtos",
        permanent: true,
      },
      {
        source: "/products/:slug",
        destination: "/produtos/:slug",
        permanent: true,
      },
      {
        source: "/about",
        destination: "/sobre-nos",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/contato",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
