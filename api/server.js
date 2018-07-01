const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const gitHubAuthToken = process.env.GITHUB_AUTH_TOKEN;

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

  async run(endCursor = undefined) {
    const query = this.buildQuery(endCursor);
    const response = await this.client.post('graphql', {query});
    return response.data;
  }

  buildQuery(endCursor) {
    const after = endCursor ? `after:"${endCursor}",` : '';
    return `
      query {
        search(first: 100, ${after} query: "language:${this.language} good-first-issues:>1 stars:>500", type: REPOSITORY) {
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

app.get('/issues', async (req, res) => {
  const language = req.query.language;
  if (language) {
    const finder = new GoodFirstIssueFinder(client, language);
    const result = await finder.run(req.query.endCursor);
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send(result);
  } else {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({ error: 'please set "language"' });
  }
});

app.get('*', function(req, res){
  res.send('Not Found', 404);
});

app.listen(PORT, function () {
  console.log('Example app listening on port 3000!')
});
