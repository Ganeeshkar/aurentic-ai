/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Pre-industries-pivot routes (SMB/agency-era IA)
      { source: "/services", destination: "/technology", permanent: true },
      { source: "/services/:path*", destination: "/technology", permanent: true },
      { source: "/use-cases", destination: "/industries", permanent: true },
      { source: "/use-cases/:path*", destination: "/industries", permanent: true },
      // Solution-first IA (superseded by industries-first)
      { source: "/capabilities", destination: "/technology", permanent: true },
      { source: "/capabilities/:path*", destination: "/technology", permanent: true },
      { source: "/solutions", destination: "/industries", permanent: true },
      { source: "/solutions/:path*", destination: "/industries", permanent: true },
    ];
  },
};

export default nextConfig;
