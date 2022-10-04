import { getRelatedPosts } from "../../../../../apis";
import protectApi from "../../../../../middleware/protectApi";

/**
 * It takes in a request and a response, and then it returns a post
 * @param req - The request object.
 * @param res - The response object.
 */
async function postHandler(req, res) {
  const { ...queries } = req.query;

  const post = await getRelatedPosts({
    ...queries,
  });

  res.status(200).json(post);
}

export default protectApi(postHandler);
