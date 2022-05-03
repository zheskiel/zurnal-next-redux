import { getTagPosts } from "../../../../apis";
import protectApi from "../../../../middleware/protectApi";

/**
 * It takes in a request and response object, and then returns a JSON object of the posts that match
 * the tag
 * @param req - The request object.
 * @param res - the response object
 */
async function postHandler(req, res) {
  const { ...queries } = req.query;

  const post = await getTagPosts({
    ...queries,
  });

  res.status(200).json(post);
}

export default protectApi(postHandler);
