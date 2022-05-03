import { getRelatedPosts } from "../../../../../../apis";
import protectApi from "../../../../../../middleware/protectApi";

/**
 * It takes in a request object, and returns a response object
 * @param req - The request object.
 * @param res - The response object.
 */
async function postHandler(req, res) {
  const { ...queries } = req.query;

  const relatedPosts = await getRelatedPosts({
    ...queries,
  });

  res.status(200).json(relatedPosts);
}

export default protectApi(postHandler);
