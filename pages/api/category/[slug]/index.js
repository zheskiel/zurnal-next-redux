import { getCategory } from "../../../../apis";
import protectApi from "../../../../middleware/protectApi";

async function postHandler(req, res) {
  const { ...queries } = req.query;

  const post = await getCategory({
    ...queries,
  });

  res.status(200).json(post);
}

export default protectApi(postHandler);
