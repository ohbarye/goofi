const axios = require('axios');
const express = require('express');
const next = require('next');
const cors = require('cors');

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

app.prepare().then(() => {
  const server = express();

  server.use(cors());

  if (!dev) {
    server.get('*', (_, res, next) => {
      res.setHeader('Cache-Control', 'max-age=43200, immutable');
      next();
    });
  }

  server.get('/issues', cors(), async (req, res) => {
    const {
      language,
      endCursor,
      perPage,
    } = req.query;
    if (language) {
      const finder = new GoodFirstIssueFinder(client, language);
      const result = await finder.run(endCursor, perPage);
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(result);
    } else {
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.status(400).send({ error: 'please set "language"' });
    }
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
