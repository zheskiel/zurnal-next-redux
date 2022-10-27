let sitemapUrl = "https://sitemap.zurnal.co";

module.exports = [
  {
    source: "/lyrics-app/sitemap.xml",
    destination: `${sitemapUrl}/lyrics-app/sitemap.xml`,
  },
  {
    source: "/lyrics-app/sitemap-post-:id.xml",
    destination: `${sitemapUrl}/lyrics-app/sitemap-post-:id.xml`,
  },
];
