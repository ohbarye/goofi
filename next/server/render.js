const LRUCache = require('lru-cache');
const wrap = require('await-wrap');
const dev = process.env.NODE_ENV !== 'production';
// const queryData = require('../helpers/query-data');

const cache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 60 * 6, // 6 hour cache
});

module.exports = app => async (req, res, pagePath) => {
  const { language, endCursor, perPage } = req.query;

  const key = `language=${language}&endCursor=${endCursor}&perPage=${perPage}`;

  // If we have a page in the cache, let's serve it
  if (!dev && cache.has(key)) {
    console.log(`RENDER CACHE HIT: ${key}`);

    return res.send(cache.get(key));
  }

  const { err, data } = await wrap(app.renderToHTML(req, res, pagePath));

  if (err) return app.renderError(err, req, res, pagePath);

  console.log(`RENDER CACHE MISS: ${key}`);

  cache.set(key, data);

  return res.send(data);
};
