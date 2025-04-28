/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  images: {
    domains: ['eu-004.s3.synologyc2.net'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*",
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://10.200.11.244:3000/:path*",
  //     },
  //   ];
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination:
  //         "https://onufemme-admin-ws.f9tkixr0bx6.eu-gb.codeengine.appdomain.cloud/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
