const express = require('express');
const next = require('next');
const cors = require('cors');
const { join } = require('path');
const wrap = require('await-wrap');
const { apolloServer, getGoodFirstIssues } = require('./graphql');

if (!process.env.GITHUB_AUTH_TOKEN) {
  throw new Error('GITHUB_AUTH_TOKEN is not provided! Please set the token with ENV.')
}

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  apolloServer.applyMiddleware({ app: server, path: '/graphql' });

  server.use(cors());

  server.get('/issues', cors(), async (req, res) => {
    const { language, endCursor, perPage } = req.query;
    const result = await getGoodFirstIssues({language, endCursor, perPage});

    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
  });

  server.get('/service-worker.js', ServiceWorker(app));
  server.get('/', async (req, res) => {
    const { err, data } = await wrap(app.renderToHTML(req, res, '/'));
    if (err) return app.renderError(err, req, res, '/');
    return res.send(data);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});

const ServiceWorker = app => (req, res) => {
  const filePath = join(__dirname, '../', '.next', 'service-worker.js');

  app.serveStatic(req, res, filePath);
};
