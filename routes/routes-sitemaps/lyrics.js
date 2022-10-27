let sitemapUrl = "https://sitemap.zurnal.co";

module.exports = [
  {
    source: "/app-lyrics/sitemap.xml",
    destination: `${sitemapUrl}/app-lyrics/sitemap.xml`,
  },
  {
    source: "/app-lyrics/sitemap-post-:id.xml",
    destination: `${sitemapUrl}/app-lyrics/sitemap-post-:id.xml`,
  },
];
