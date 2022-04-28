import { parseSitemaps } from "../../../utils/helpers";
import { getPostsSitemap } from "../../../apis";

export const getServerSideProps = async ({ res }) => {
  const items = await getPostsSitemap();
  const sitemap = parseSitemaps(items);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default () => {};
