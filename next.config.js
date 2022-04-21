const nextConfig = {
  images: {
    domains: ['picsum.photos', 'blog-backend.test'],
  },
  env: {
    REACT_API_BASEURL: process.env.REACT_API_BASEURL,
  }
};

module.exports = nextConfig;