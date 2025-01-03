import { getPosts } from "../../../apis";
import protectApi from "../../../middleware/protectApi";

/**
 * It takes in a request and a response, and then it gets the posts from the database, and then it
 * sends the posts back to the client
 * @param req - The request object.
 * @param res - The response object.
 */
async function postsHandler(req, res) {
  const { ...queries } = req.query;

  const posts = await getPosts({
    ...queries,
  });

  res.status(200).json(posts);
}

export default protectApi(postsHandler);
