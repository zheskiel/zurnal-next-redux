import { parseSitemaps } from "../../../utils/helpers";
import { getPostsByIdSitemap } from "../../../apis";

export const getServerSideProps = async ({ res, query }) => {
  const { id } = query;
  const items = await getPostsByIdSitemap(id);

  const sitemap = parseSitemaps(items, "url");

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default () => {};
