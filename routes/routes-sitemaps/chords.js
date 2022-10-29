let sitemapUrl = "https://sitemap.zurnal.co";

module.exports = [
  {
    source: "/app-chords/sitemap.xml",
    destination: `${sitemapUrl}/app-chords/sitemap.xml`,
  },
  {
    source: "/app-chords/sitemap-chord-:id.xml",
    destination: `${sitemapUrl}/app-chords/sitemap-chord-:id.xml`,
  },
];
