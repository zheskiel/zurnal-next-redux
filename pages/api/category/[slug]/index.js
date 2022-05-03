import { getCategory } from "../../../../apis";
import protectApi from "../../../../middleware/protectApi";

/**
 * It takes in a request and a response, and then it returns a response with the data from the database
 * @param req - The request object.
 * @param res - The response object.
 */
async function postHandler(req, res) {
  const { ...queries } = req.query;

  const post = await getCategory({
    ...queries,
  });

  res.status(200).json(post);
}

export default protectApi(postHandler);
