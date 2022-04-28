import { getRelatedPosts } from "../../../../../../apis";
import protectApi from "../../../../../../middleware/protectApi";

async function postHandler(req, res) {
  const { ...queries } = req.query;

  const relatedPosts = await getRelatedPosts({
    ...queries,
  });

  res.status(200).json(relatedPosts);
}

export default protectApi(postHandler);
