let sitemapUrl = 'https://sitemap.zurnal.co';

module.exports = [
  {
    source: '/sitemap.xml',
    destination: `${sitemapUrl}/sitemap.xml`,
  },
  {
    source: '/posts/sitemap.xml',
    destination: `${sitemapUrl}/posts/sitemap.xml`,
  },
  {
    source: '/posts/sitemap-post-:id.xml',
    destination: `${sitemapUrl}/posts/sitemap-post-:id.xml`,
  },
];
