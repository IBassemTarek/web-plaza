/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: "http://localhost:3000",
    DB_URI:
      "mongodb+srv://ibassemtarek:ysjn4XBC9l6eXU7l@cluster0.7h8asbr.mongodb.net/webplaza",
    NEXTAUTH_URL: "http://127.0.0.1:3000",
    NEXTAUTH_SECRET: "codingwithbassem",
  },
  images: {
    domains: ["m.media-amazon.com"],
  },
};

module.exports = nextConfig;
