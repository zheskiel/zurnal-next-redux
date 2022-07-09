let routes = [];
let redirects = [];
let sitemapRoutes = require("./routes-sitemaps");
let redirectRoutes = require("./route-redirects");

// Sitemap routes
sitemapRoutes.map((route) => routes.push(route));

// Redirect routes
redirectRoutes.map((route) => redirects.push(route));

module.exports = {
  swcMinify: false,
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  publicRuntimeConfig: {
    APP_ENV: process.env.NEXT_APP_ENV,
    SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    GA_TRACKING: process.env.NEXT_PUBLIC_GA_ID,
  },

  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build

    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      });
    }

    return config;
  },

  async rewrites() {
    return routes;
  },

  async redirects() {
    return redirects;
  },
};
