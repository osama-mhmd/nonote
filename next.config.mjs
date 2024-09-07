/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments.asyncWebAssembly = true;
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
};

export default nextConfig;
