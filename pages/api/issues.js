import { getGoodFirstIssues } from '../../server/graphql';

export default async (req, res) => {
  const { language, endCursor, perPage } = req.query;
  const result = await getGoodFirstIssues({language, endCursor, perPage});

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.send(result);
}
