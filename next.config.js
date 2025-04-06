/** @type {import('next').NextConfig} */
// next.config.js
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://onufemme-admin-ws.f9tkixr0bx6.eu-gb.codeengine.appdomain.cloud/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
