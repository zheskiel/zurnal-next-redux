import { getPosts } from "../../../apis";
import protectApi from "../../../middleware/protectApi";

async function postsHandler(req, res) {
  const { ...queries } = req.query;

  const posts = await getPosts({
    ...queries,
  });

  res.status(200).json(posts);
}

export default protectApi(postsHandler);
