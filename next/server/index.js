const axios = require('axios');
const express = require('express');
const next = require('next');
const cors = require('cors');
const LRUCache = require('lru-cache');
const { join } = require('path');

const gitHubAuthToken = process.env.GITHUB_AUTH_TOKEN;

if (!gitHubAuthToken) {
  throw new Error('GITHUB_AUTH_TOKEN is not provided! Please set the token with ENV.')
}

const client = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${gitHubAuthToken}`,
  },
});

const cache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 60 * 6, // 6 hour cache
});

class GoodFirstIssueFinder {
  constructor(client, language) {
    this.client = client;
    this.language = language;

    this.run = this.run.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
  }

  async run(endCursor = undefined, perPage = 10) {
    const query = this.buildQuery(endCursor, perPage);
    const response = await this.client.post('graphql', {query});
    return response.data;
  }

  buildQuery(endCursor, perPage) {
    const after = endCursor ? `after:"${endCursor}",` : '';
    return `
      query {
        search(first: ${perPage}, ${after} query: "language:${this.language} good-first-issues:>1 stars:>500", type: REPOSITORY) {
          repositoryCount
          pageInfo {
            startCursor
            endCursor
            hasNextPage
          }
          nodes {
            ... on Repository {
              owner {
                id
                avatarUrl
                login
                url
              }
              id
              description
              name
              url
              issues(first: 100, labels: ["good first issue"], states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}) {
                totalCount
                nodes {
                  title
                  url
                  author {
                    avatarUrl
                  }
                  updatedAt
                }
              }
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    `
  }
}

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const getResult = async ({ language, endCursor, perPage }) => {
  const key = `language=${language}&endCursor=${endCursor}&perPage=${perPage}`;

  if (cache.has(key)) {
    console.log(`RENDER CACHE HIT: ${key}`);

    return cache.get(key);
  }

  const finder = new GoodFirstIssueFinder(client, language);
  const result = await finder.run(endCursor, perPage);

  cache.set(key, result);

  return result;
};

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  server.get('/issues', cors(), async (req, res) => {
    const {
      language,
      endCursor,
      perPage,
    } = req.query;
    if (language) {
      const result = await getResult({language, endCursor, perPage});

      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    } else {
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.status(400).send({ error: 'please set "language"' });
    }
  });

  server.get('/service-worker.js', ServiceWorker(app));
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
