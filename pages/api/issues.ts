import { getGoodFirstIssues } from "../../helpers/graphql";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { language, endCursor, perPage } = req.query;
  if (
    Array.isArray(language) ||
    Array.isArray(endCursor) ||
    Array.isArray(perPage)
  ) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(
      `language, endCursor and perPage must not be an array. Check the query that you sent ${req.query}`
    );
  } else {
    const result = await getGoodFirstIssues({ language, endCursor, perPage });

    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(result);
  }
};
