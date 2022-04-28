import { createSitemap } from "../../utils/helpers";

export const getServerSideProps = ({ res }) => {
  const staticUrls = [`posts/sitemap.xml`];
  const sitemap = createSitemap(staticUrls);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default () => {};
